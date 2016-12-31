import { SOCKET_CONNECTED } from '../actions/socketActions';

const INITIAL_STATE = {
  socket: null,
  connected: false,
};


export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case SOCKET_CONNECTED:
      return {
        socket: action.socket,
        connected: true
      };
    default:
      return state;
  }
}