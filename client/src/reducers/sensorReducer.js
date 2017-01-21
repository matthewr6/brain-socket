import { SENSOR_NAMES, SENSOR_STATUSES, SENSOR_TOGGLED } from '../actions/sensorActions';

const INITIAL_STATE = {
    names: [],
    statuses: {}
};

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case SENSOR_NAMES:
        return {
            names: action.sensors,
            statuses: state.statuses
        };
    case SENSOR_STATUSES:
        return {
            names: state.names,
            statuses: action.sensors
        };
    case SENSOR_TOGGLED:
        return {
            names: state.names,
            statuses: {
                ...state.statuses,
                [action.name]: action.status
            }
        };
    default:
      return state
  }
}