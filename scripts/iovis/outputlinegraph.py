# FROM :: brain-socket

import os
import sys
import json

import numpy as np
import matplotlib.pyplot as plt

def dictify(outputs):
    ret = {}
    for name, output in outputs.iteritems():
        for side, values in output.iteritems():
            for i, v in enumerate(values):
                together_name = '{}-{}-{}'.format(name, side, i)
                ret[together_name] = v
    return ret

def to_dict(arr):
    nd = {}
    for d in arr:
        for k,v in d.items():
            try:
                nd[k].append(v)
            except KeyError:
                nd[k] = [v]
    return nd

def main(count):
    data = []
    for i in range(count):
        with open('combined/{}.json'.format(i), 'rb') as datafile:
            data.append(
                dictify(json.load(datafile)['outputs'])
            )
    x = np.arange(len(data))
    data = to_dict(data)
    width = 25
    height = 5
    plt.figure(figsize=(width, height))
    for k in data:
        plt.plot(x, data[k], label=k)
    # plt.legend()

    # plt.axvline(500, color='black', ls='dashed')
    # plt.axvline(750, color='black', ls='dashed')

    plt.savefig('line.png')

if __name__ == '__main__':
    main(int(sys.argv[1]))