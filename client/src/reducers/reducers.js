import { combineReducers } from 'redux';

import outputReducer from './outputReducer';

const rootReducer = combineReducers({
    outputs: outputReducer
});

export default rootReducer;