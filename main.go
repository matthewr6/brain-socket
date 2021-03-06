package main

import (
    "github.com/matthewr6/gopher-brain"
    "github.com/googollee/go-socket.io"

    "os"
    "fmt"
    "log"
    "strconv"
    "net/http"
    "encoding/json"
)

const MAIN_ROOM = "server"

func EmitToAll(so socketio.Socket, event string, data ...interface{}) {
    so.BroadcastTo(MAIN_ROOM, event, data...)
    so.Emit(event, data...)
}

func main() {
    sensorStatuses := make(map[string]bool)
    directory := "."
    connectionCounts := []int{}
    connectionAvgStrengths := []float64{}
    noInputCount := []int{}
    noOutputCount := []int{}
    isolatedCount := []int{}
    myNet := brain.Brain([3]int{12, 12, 12}, []brain.SensorConstructor{}, false, false)


    sensorStatuses = SerializeSensorStatuses(myNet)

    server, err := socketio.NewServer(nil)
    if err != nil {
        log.Fatal(err)
    }
    server.On("create", func(so socketio.Socket, x int, y int, z int, hemispheres bool, randomize bool) {
        myNet = brain.Brain([3]int{x, y, z}, []brain.SensorConstructor{}, hemispheres, randomize)

        EmitToAll(so, "cycle", myNet.Frames)
        EmitToAll(so, "outputs", SerializeOutputs(myNet))
        EmitToAll(so, "sensors", SerializeSensors(myNet))
        sensorStatuses = SerializeSensorStatuses(myNet)
        EmitToAll(so, "sensorStatuses", sensorStatuses)
        connectionCounts = []int{}
        connectionAvgStrengths = []float64{}
        noInputCount = []int{}
        noOutputCount = []int{}
        isolatedCount = []int{}
    })
    server.On("createSensor", func(so socketio.Socket, name string, radius int, count int, plane string, centerX int, centerY int, centerZ int, outputCount int) {
        fmt.Println("on")
        log.Println("Start creating sensor")
        myNet.CreateSensor(name, radius, count, plane, [3]int{centerX, centerY, centerZ},  outputCount, func(nodes []*brain.Node, influences map[string]*brain.Output) {
            //
        })
        log.Println("Finished creating sensor")
        EmitToAll(so, "outputs", SerializeOutputs(myNet))
        EmitToAll(so, "sensors", SerializeSensors(myNet))
        sensorStatuses = SerializeSensorStatuses(myNet)
        EmitToAll(so, "sensorStatuses", sensorStatuses)
    })
    server.On("connection", func(so socketio.Socket) {
        so.Join(MAIN_ROOM)
        so.Emit("connected", true)
        so.Emit("cycle", myNet.Frames)

        // jsonRep, _ := json.Marshal(outputs)
        so.Emit("outputs", SerializeOutputs(myNet))
        so.Emit("sensors", SerializeSensors(myNet))

        so.Emit("sensorStatuses", sensorStatuses)

        so.Emit("directoryChanged", directory)

        so.Emit("learningRates",
            brain.SYNAPSE_LEARNING_RATE,
            brain.DYNAMIC_SYNAPSE_PROB_SPHERE,
            brain.MIN_CONNECTIONS,
            brain.MAX_CONNECTIONS)

        so.Emit("connectionSkew",
            brain.AXON_SKEW,
            brain.DYNAMIC_SYNAPSE_SKEW)

        // todo - function in gopher-brain pkg to allow conversion of net to fully JSON-able state
        // sensors := make(map[string]float64)
        // for name, sensor := range myNet.Sensors {
        //     sensors[name] = sensor.Value
        // }
        // jsonRep, _ := json.Marshal(sensors)
        // so.Emit("sensors", string(jsonRep))
    })
    server.On("error", func(so socketio.Socket, err error) {
        log.Println("error:", err)
    })
    server.On("historicalConnectionInfo", func(so socketio.Socket) {
        // connectionCountFile, _ := os.Create(fmt.Sprintf("%v/connections/counts.json", directory))
        // countJsonRep, _ := json.MarshalIndent(connectionCounts, "", "    ")
        // connectionCountFile.WriteString(string(countJsonRep))
        // connectionCountFile.Close()
        SaveArrToJSON(directory, "counts", connectionCounts)
        SaveArrToJSON(directory, "noInputs", noInputCount)
        SaveArrToJSON(directory, "noOutputs", noOutputCount)
        SaveArrToJSON(directory, "isolated", isolatedCount)

        connectionStrengthFile, _ := os.Create(fmt.Sprintf("%v/connections/strengths.json", directory))
        strengthJsonRep, _ := json.MarshalIndent(connectionAvgStrengths, "", "    ")
        connectionStrengthFile.WriteString(string(strengthJsonRep))
        connectionStrengthFile.Close()
    })
    server.On("learningRates", func (so socketio.Socket, rate float64, probSphere float64, minConnections int, maxConnections int) {
        if minConnections >= maxConnections {
            return
        }
        brain.SetLearningRates(brain.LearningRates{
            MinPossibleConnections: minConnections,
            MaxPossibleConnections: maxConnections,
            SynapseModificationRate: rate,
            SynapseProbSphere: probSphere,
        })
        EmitToAll(so, "learningRates", rate, probSphere, minConnections, maxConnections)
    })
    server.On("connectionSkew", func(so socketio.Socket, axonSkew float64, minorSkew float64) {
        brain.SetSkews(axonSkew, minorSkew)
        EmitToAll(so, "connectionSkew", axonSkew, minorSkew)    
    })
    server.On("cycle", func(so socketio.Socket, cycles int, saveFrames bool, saveIO bool) {
        for i := 0; i < cycles; i++ {
            myNet.Cycle()

            connectionCount, avgStrength, noInputs, noOutputs, isolated := myNet.CountConnections()
            connectionCounts = append(connectionCounts, connectionCount)
            connectionAvgStrengths = append(connectionAvgStrengths, avgStrength)
            noInputCount = append(noInputCount, noInputs)
            noOutputCount = append(noOutputCount, noOutputs)
            isolatedCount = append(isolatedCount, isolated)
            for name, sensor := range myNet.Sensors {
                if sensorStatuses[name] {
                    for _, node := range sensor.Nodes {
                        node.Value = 1
                    }
                }
            }
            if saveFrames {
                myNet.DumpJSON(strconv.Itoa(myNet.Frames), directory)
            }

            if saveIO {
                // stuff
                sensorFile, _ := os.Create(fmt.Sprintf("%v/io/sensors/%v.json", directory, myNet.Frames))
                sJsonRep, _ := json.MarshalIndent(sensorStatuses, "", "    ")
                sensorFile.WriteString(string(sJsonRep))
                sensorFile.Close()

                outputFile, _ := os.Create(fmt.Sprintf("%v/io/outputs/%v.json", directory, myNet.Frames))
                oJsonRep, _ := json.MarshalIndent(SerializeOutputs(myNet), "", "    ")
                outputFile.WriteString(string(oJsonRep))
                outputFile.Close()
            }

            EmitToAll(so, "cycle", myNet.Frames)

            outputs := SerializeOutputs(myNet)
            EmitToAll(so, "outputs", outputs)
        }
    })
    server.On("toggleSensor", func(so socketio.Socket, name string, status bool) {
        sensorStatuses[name] = status
        EmitToAll(so, "sensorToggled", name, status)
    })
    server.On("autorun", func(so socketio.Socket, autorun bool) {
        EmitToAll(so, "autorun", autorun)
    })
    server.On("directoryName", func(so socketio.Socket, name string) {
        directory = name
        if directory == "" {
            directory = "."
        }
        if directory[len(directory)-1] == '/' {
            directory = directory[0:len(directory)-1]
        }
        EmitToAll(so, "directoryChanged", name)
    })
    server.On("save", func(so socketio.Socket, saveName string) {
        log.Println(directory)
        if _, err := os.Stat(directory); os.IsNotExist(err) {
            log.Println("mkdir")
            os.MkdirAll(fmt.Sprintf("%v/frames", directory), os.ModePerm)
            os.MkdirAll(fmt.Sprintf("%v/state", directory), os.ModePerm)
        }
        myNet.SaveState(saveName, directory)
        EmitToAll(so, "saved")
    })
    server.On("load", func(so socketio.Socket, loadName string) {
        myNet = brain.LoadState(loadName, directory)
        for _, sensor := range myNet.Sensors {
            sensor.In = func(nodes []*brain.Node, influences map[string]*brain.Output) {
                //
            }
        }
        EmitToAll(so, "cycle", myNet.Frames)
        EmitToAll(so, "outputs", SerializeOutputs(myNet))
        EmitToAll(so, "sensors", SerializeSensors(myNet))
        sensorStatuses = SerializeSensorStatuses(myNet)
        EmitToAll(so, "sensorStatuses", sensorStatuses)
        connectionCounts = []int{}
        connectionAvgStrengths = []float64{}
        noInputCount = []int{}
        noOutputCount = []int{}
        isolatedCount = []int{}
    })

    http.Handle("/socket.io/", server)
    http.Handle("/", http.FileServer(http.Dir("./client/build")))
    log.Println("-- Serving localhost:3000 --")
    log.Fatal(http.ListenAndServe(":3000", nil))
}