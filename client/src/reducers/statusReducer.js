import { CYCLED } from '../actions/actions';

const INITIAL_STATE = 0;

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case CYCLED:
      return (action.frames);
    default:
      return state;
  }
}