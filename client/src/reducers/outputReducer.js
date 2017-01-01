import { OUTPUTS_UPDATED } from '../actions/outputActions';

const INITIAL_STATE = {}

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case OUTPUTS_UPDATED:
        return action.outputs
    default:
      return state
  }
}