import { combineReducers } from 'redux';

import outputReducer from './outputReducer';
import socketReducer from './socketReducer';
import statusReducer from './statusReducer';
import sensorReducer from './sensorReducer';
import learningRateReducer from './learningRateReducer';

const rootReducer = combineReducers({
    outputs: outputReducer,
    socket: socketReducer,
    status: statusReducer,
    sensors: sensorReducer,
    learningRate: learningRateReducer,
});

export default rootReducer;