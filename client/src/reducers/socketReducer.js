import { SOCKET_CONNECTED, SOCKET_DISCONNECTED } from '../actions/socketActions';

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
    case SOCKET_DISCONNECTED:
      return {
        socket: state.socket,
        connected: false
      }
    default:
      return state;
  }
}