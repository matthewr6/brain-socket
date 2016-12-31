import { combineReducers } from 'redux';

import outputReducer from './outputReducer';
import socketReducer from './socketReducer';
import statusReducer from './statusReducer';

const rootReducer = combineReducers({
    outputs: outputReducer,
    socket: socketReducer,
    status: statusReducer,
});

export default rootReducer;