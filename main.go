package main

import (
    "github.com/firedrake969/gopher-brain"
    "github.com/googollee/go-socket.io"

    "log"
    "net/http"
)

func main() {
    myNet := brain.Brain([3]int{12, 25, 25}, []brain.SensorConstructor{
        brain.SensorConstructor{
            Name:"eye",
            R: 1,
            Count: 9,
            Plane: "y",
            Center: [3]int{8, 0, 12},
            OutputCount: 2,
            InputFunc: func(nodes []*brain.Node, influences map[string]*brain.Output) {
                for _, node := range nodes {
                    node.Value = 1
                }
            },
        },
    })

    server, err := socketio.NewServer(nil)
    if err != nil {
        log.Fatal(err)
    }
    // server.On("connection", func(so socketio.Socket) {
        
    // })
    server.On("error", func(so socketio.Socket, err error) {
        log.Println("error:", err)
    })

    http.Handle("/socket.io/", server)
    http.Handle("/", http.FileServer(http.Dir("./public")))
    log.Println("-- Serving localhost:3000 --")
    log.Fatal(http.ListenAndServe(":3000", nil))
}