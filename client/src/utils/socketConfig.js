import io from 'socket.io-client';

import { socketConnected } from '../actions/socketActions';
import { cycled } from '../actions/actions';
import { updateOutputs } from '../actions/outputActions';

function initializeListeners(socket, dispatch) {
  socket.on('connect', () => {
    dispatch(socketConnected(socket));
  });
  socket.on('disconnect', () => {
    dispatch(socketDisconnected());
  });
  socket.on('error', (error) => {
    console.error(error);
  });

  socket.on('outputs', (outputs) => {
    dispatch(updateOutputs(JSON.parse(outputs)));
  });
  socket.on('cycle', (frames) => {
    dispatch(cycled(frames));
  });
}

export function connectSocket(dispatch, socket) {
  if (!socket) {
    let newSocket = io.connect();
    initializeListeners(newSocket, dispatch);
    newSocket.connect();
    return newSocket;
  }
  return socket;
}