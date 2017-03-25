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

# for sensors - name bars 1/0 based on on/off
def main(count):
    for i in range(count):
        with open('combined/{}.json'.format(i), 'rb') as datafile:
            data = json.load(datafile)
        outputs = data['outputs']
        sensors = data['sensors']
        for s in sensors:
            sensors[s] = int(sensors[s])
        data = dictify(outputs)

        xlabels = []
        # this is hacky
        transform = {
            'left': 'one',
            'right': 'two'
        }
        for k in data.keys():
            name, side, _ = k.split('-')
            side = transform[side]
            xlabels.append(
                sensors['{}-{}'.format(name, side)]
            )

        fig, ax = plt.subplots()
        plt.bar(np.arange(len(data)), data.values(), align='center')
        plt.ylim(0, 5) # todo - choose ymax
        plt.xticks(np.arange(len(data)), xlabels)
        plt.savefig('graphs/{}.png'.format(i))
        # plt.clf()
        plt.close()
        # plt.show()

if __name__ == '__main__':
    main(int(sys.argv[1]))