import { CYCLED, AUTORUN_TOGGLED, DIRECTORY_CHANGED } from '../actions/actions';

const INITIAL_STATE = {
  frames: 0,
  autorun: false,
  directory: ''
};

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case CYCLED:
      return {
        ...state,
        frames: action.frames
      };
    case AUTORUN_TOGGLED:
      return {
        ...state,
        autorun: action.autorun
      };
    case DIRECTORY_CHANGED:
      return {
        ...state,
        directory: action.directory
      };
    default:
      return state;
  }
}