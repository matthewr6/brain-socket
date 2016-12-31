import { connectSocket } from '../utils/socketConfig';

export const SOCKET_CONNECTED = 'SOCKET_CONNECTED';

export function initializeSocket() {
  return (dispatch, getState) => {
    const { user, socket } = getState();
    const newSocket = connectSocket(dispatch, socket.socket);
  };
};

export function socketConnected(socket) {
  return { type: SOCKET_CONNECTED, socket: socket };
}