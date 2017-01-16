import { SENSORS_UPDATED } from '../actions/sensorActions';

const INITIAL_STATE = [];

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case SENSORS_UPDATED:
        return action.sensors
    default:
      return state
  }
}