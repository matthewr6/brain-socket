package main

import (
    "github.com/firedrake969/gopher-brain"
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
    frames := 0 // TODO - move this into a property on the Network struct
    myNet := brain.Brain([3]int{12, 25, 25}, []brain.SensorConstructor{
        brain.SensorConstructor{
            Name:"eye",
            R: 1,
            Count: 9,
            Plane: "y",
            Center: [3]int{8, 0, 12},
            OutputCount: 5,
            InputFunc: func(nodes []*brain.Node, influences map[string]*brain.Output) {
                //
            },
        },
        brain.SensorConstructor{
            Name:"ear",
            R: 1,
            Count: 9,
            Plane: "y",
            Center: [3]int{8, 8, 12},
            OutputCount: 3,
            InputFunc: func(nodes []*brain.Node, influences map[string]*brain.Output) {
                //
            },
        },
    })


    sensorStatuses = SerializeSensorStatuses(myNet)

    server, err := socketio.NewServer(nil)
    if err != nil {
        log.Fatal(err)
    }
    server.On("create", func(so socketio.Socket, x int, y int, z int) {
        myNet = brain.Brain([3]int{x, y, z}, []brain.SensorConstructor{})

        frames = 0
        EmitToAll(so, "cycle", frames)
        EmitToAll(so, "outputs", SerializeOutputs(myNet))
        EmitToAll(so, "sensors", SerializeSensors(myNet))
        sensorStatuses = SerializeSensorStatuses(myNet)
        EmitToAll(so, "sensorStatuses", sensorStatuses)
    })
    server.On("createSensor", func(so socketio.Socket, name string, radius int, count int, plane string, centerX int, centerY int, centerZ int, outputCount int) {
        // log.Println(name, radius, plane, centerX, centerY, centerZ, outputCount);
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
        so.Emit("cycle", frames)

        // jsonRep, _ := json.Marshal(outputs)
        so.Emit("outputs", SerializeOutputs(myNet))
        so.Emit("sensors", SerializeSensors(myNet))

        so.Emit("sensorStatuses", sensorStatuses)

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
    server.On("cycle", func(so socketio.Socket, cycles int, saveFrames bool, saveIO bool) {
        // should I save before or after cycle?
        for i := 0; i < cycles; i++ {
            myNet.Cycle()
            for name, sensor := range myNet.Sensors {
                if sensorStatuses[name] {
                    for _, node := range sensor.Nodes {
                        node.Value = 1
                    }
                }
            }
            if saveFrames {
                myNet.DumpJSON(strconv.Itoa(frames), directory)
            }

            if saveIO {
                // stuff
                sensorFile, _ := os.Create(fmt.Sprintf("%v/io/sensors/%v.json", directory, frames))
                sJsonRep, _ := json.MarshalIndent(sensorStatuses, "", "    ")
                sensorFile.WriteString(string(sJsonRep))
                sensorFile.Close()

                outputFile, _ := os.Create(fmt.Sprintf("%v/io/outputs/%v.json", directory, frames))
                oJsonRep, _ := json.MarshalIndent(SerializeOutputs(myNet), "", "    ")
                outputFile.WriteString(string(oJsonRep))
                outputFile.Close()
            }

            frames++

            EmitToAll(so, "cycle", frames)

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
            os.MkdirAll(fmt.Sprintf("%v/frames", directory), os.ModePerm) // what permissions do I want
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
        frames = 0
        EmitToAll(so, "cycle", frames)
        EmitToAll(so, "outputs", SerializeOutputs(myNet))
        EmitToAll(so, "sensors", SerializeSensors(myNet))
        sensorStatuses = SerializeSensorStatuses(myNet)
        EmitToAll(so, "sensorStatuses", sensorStatuses)
    })

    http.Handle("/socket.io/", server)
    http.Handle("/", http.FileServer(http.Dir("./client/build")))
    log.Println("-- Serving localhost:3000 --")
    log.Fatal(http.ListenAndServe(":3000", nil))
}