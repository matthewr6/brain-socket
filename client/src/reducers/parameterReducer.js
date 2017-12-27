import { RATES_RECEIVED, SKEWS_RECEIVED } from '../actions/parameterActions';

const INITIAL_STATE = {
  rate: 1.0,
  probSphere: 2.0,
  minConn: 5,
  maxConn: 10,

  axonSkew: 0.75,
  minorSkew: 0.5
};

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case RATES_RECEIVED:
      return {
        ...state,
        rate: action.rate,
        probSphere: action.probSphere,
        minConn: action.minConn,
        maxConn: action.maxConn
      };
    case SKEWS_RECEIVED:
      return {
        ...state,
        axonSkew: action.axonSkew,
        minorSkew: action.minorSkew
      };
    default:
      return state
  }
}