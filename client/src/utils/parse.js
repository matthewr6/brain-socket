import { step, saveState, loadState, changeDirectoryName, createNew, createSensor } from '../actions/actions';
import { toggleSensor } from '../actions/sensorActions';

export default function parse(commands) {
    commands = commands.split('\n').filter(e => e).map(e => e.toUpperCase());
    validCommands = ['CYCLE', 'SETVAL', 'SAVE', 'LOAD', 'SETPATH'];
    // create and add sensor are harder... do that later.
    // create is actually fairlly easy
    functionCalls = [];
    commands.forEach(command => {
        let parts = command.split(' ');
        if (validCommands.indexOf(parts) < 0) {
            return;
        }
        //http://stackoverflow.com/questions/1316371/converting-an-array-to-a-function-arguments-list
        switch(parts[0]) {
            case 'NEWNET':
                functionCalls.push({
                    action: createNew,
                    arguments: [parseInt(parts[1]), parseInt(parts[2]), parseInt(parts[3]), parts[4].toUpperCase == 'TRUE' ? true : false]
                });
                break;
            case 'CYCLE': // step action
                functionCalls.push({
                    action: step,
                    arguments: [parseInt(parts[1]), false, true]
                });
                break;
            case 'SETVAL': //togglesensor action
                functionCalls.push({
                    action: toggleSensor,
                    arguments: [parts[1], parts[2].toUpperCase == 'ON' ? true : false]
                });
                break;
            case 'SAVE': //savestate action
                functionCalls.push({
                    action: saveState,
                    arguments: [parts[1]]
                });
                break;
            case 'LOAD': //loadstate action
                functionCalls.push({
                    action: loadState,
                    arguments: [parts[1]]
                });
                break;
            case 'SETPATH': //changeDIrectoryName action
                functionCalls.push({
                    action: changeDirectoryName,
                    arguments: [parts[1]]
                });
                break;
            default:
                break;
        }
    });
    return functionCalls; // remember to call store.dispatch()!
}