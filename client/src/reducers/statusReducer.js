import { CYCLED, AUTORUN_TOGGLED } from '../actions/actions';

const INITIAL_STATE = {
  frames: 0,
  autorun: false
};

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case CYCLED:
      return {
        frames: action.frames,
        autorun: state.autorun
      };
    case AUTORUN_TOGGLED:
      return {
        frames: state.frames,
        autorun: action.autorun
      };
    default:
      return state;
  }
}