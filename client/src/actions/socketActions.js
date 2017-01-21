import { connectSocket } from '../utils/socketConfig';

export const SOCKET_CONNECTED = 'SOCKET_CONNECTED';
export const SOCKET_DISCONNECTED = 'SOCKET_DISCONNECTED';

export function initializeSocket() {
  return (dispatch, getState) => {
    const { user, socket } = getState();
    const newSocket = connectSocket(dispatch, socket.socket);
  };
};

export function socketConnected(socket) {
  return { type: SOCKET_CONNECTED, socket: socket };
}

export function socketDisconnected() {
  return { type: SOCKET_DISCONNECTED };
}