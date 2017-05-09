import { RATES_RECEIVED } from '../actions/learningRateActions';

const INITIAL_STATE = {
  rate: 1.0,
  probSphere: 2.0,
  minConn: 5,
  maxConn: 10
};

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case RATES_RECEIVED:
      return {
        rate: action.rate,
        probSphere: action.probSphere,
        minConn: action.minConn,
        maxConn: action.maxConn
      };
    default:
      return state
  }
}