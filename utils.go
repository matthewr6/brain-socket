package main

import (
    "github.com/firedrake969/gopher-brain"

    "fmt"
    "strings"
)

func SerializeSensors(net *brain.Network) []string {
    sensorNames := []string{}
    sensorsUsed := make(map[string]bool)
    for name := range net.Sensors {
        baseName := name[0:len(name)-4]
        if _, exists := sensorsUsed[baseName]; !exists {
            sensorNames = append(sensorNames, baseName)
            sensorsUsed[baseName] = true
        }
    }
    return sensorNames
}

func SerializeOutputs(net *brain.Network) map[string]map[string][]float64 {
    // todo possibly refactor brain structure to allow for references from sensor to brain?
    outputSubLevel := map[string][]float64{}
    outputsUsed := make(map[string]bool)
    for name, _ := range net.Outputs {
        baseName := name[0:len(name)-2]
        if _, exists := outputsUsed[baseName]; !exists {
            subLevel := []float64{}
            outputExists := true
            counter := 0
            for outputExists {
                output, existsScoped := net.Outputs[fmt.Sprintf("%v-%v", baseName, counter)]
                outputExists = existsScoped
                if outputExists {
                    subLevel = append(subLevel, output.Value)
                }
                counter += 1
            }
            outputSubLevel[baseName] = subLevel
            outputsUsed[baseName] = true
        }
    }

    outputsUsed = make(map[string]bool)
    // todo - use left/right keys instead of array?
    outputs := make(map[string]map[string][]float64)
    for name, _ := range outputSubLevel {
        baseName := strings.Split(name, "-")[0]
        if _, exists := outputsUsed[baseName]; !exists {
            outputs[baseName] = map[string][]float64{
                "left": outputSubLevel[fmt.Sprintf("%v-one", baseName)],
                "right": outputSubLevel[fmt.Sprintf("%v-two", baseName)],
            }
            outputsUsed[baseName] = true
        }
    }
    return outputs
}