import { combineReducers } from 'redux';

import outputReducer from './outputReducer';
import socketReducer from './socketReducer';
import statusReducer from './statusReducer';
import sensorReducer from './sensorReducer';

const rootReducer = combineReducers({
    outputs: outputReducer,
    socket: socketReducer,
    status: statusReducer,
    sensors: sensorReducer,
});

export default rootReducer;