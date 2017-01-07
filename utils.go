package main

import (
    "github.com/firedrake969/gopher-brain"

    "fmt"
    "strings"
)

func SerializeOutputs(net *brain.Network) map[string][][]float64 {
    // todo possibly refactor brain structure to allow for references from sensor to brain?
    // todo - use only first part of name instead of -one and -two
    outputSubLevel := map[string][]float64{}
    outputsUsed := make(map[string]bool)
    for name, _ := range net.Outputs {
        baseName := name[0:len(name)-2]
        if _, exists := outputsUsed[baseName]; !exists {
            // todo - gather all 0 through N
            outputSubLevel[baseName] = []float64{net.Outputs[fmt.Sprintf("%v-0", baseName)].Value, net.Outputs[fmt.Sprintf("%v-1", baseName)].Value}
            outputsUsed[baseName] = true
        }
    }

    outputsUsed = make(map[string]bool)
    // todo - use left/right keys instead of array?
    outputs := make(map[string][][]float64)
    for name, _ := range outputSubLevel {
        baseName := strings.Split(name, "-")[0]
        if _, exists := outputsUsed[baseName]; !exists {
            outputs[baseName] = [][]float64{outputSubLevel[fmt.Sprintf("%v-one", baseName)], outputSubLevel[fmt.Sprintf("%v-two", baseName)]}
            outputsUsed[baseName] = true
        }
    }
    return outputs
}