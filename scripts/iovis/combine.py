# FROM :: brain-socket

import os
import json
import glob

def main():
    for name in glob.glob('sensors/*.json'):
        _, filename = os.path.split(name)
        if os.path.isfile('outputs/{}'.format(filename)):
            with open('sensors/{}'.format(filename), 'rb') as datafile:
                s_data = json.load(datafile)
            with open('outputs/{}'.format(filename), 'rb') as datafile:
                o_data = json.load(datafile)
            with open('combined/{}'.format(filename), 'wb') as datafile:
                json.dump({
                    'sensors': s_data,
                    'outputs': o_data
                }, datafile, indent=4)

main()