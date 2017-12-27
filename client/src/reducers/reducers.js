import { combineReducers } from 'redux';

import outputReducer from './outputReducer';
import socketReducer from './socketReducer';
import statusReducer from './statusReducer';
import sensorReducer from './sensorReducer';
import parameterReducer from './parameterReducer';

const rootReducer = combineReducers({
    outputs: outputReducer,
    socket: socketReducer,
    status: statusReducer,
    sensors: sensorReducer,
    parameters: parameterReducer,
});

export default rootReducer;