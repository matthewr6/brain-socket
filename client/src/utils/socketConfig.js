import io from 'socket.io-client';

import { socketConnected, socketDisconnected } from '../actions/socketActions';
import { cycled, autorunToggled, directoryChanged } from '../actions/actions';
import { updateOutputs } from '../actions/outputActions';
import { sensorNames, sensorStatuses, sensorToggled } from '../actions/sensorActions';

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
    dispatch(updateOutputs(outputs));
  });
  socket.on('sensors', (sensors) => {
    dispatch(sensorNames(sensors));
  });
  socket.on('sensorStatuses', (sensors) => {
    dispatch(sensorStatuses(sensors));
  });
  socket.on('sensorToggled', (name, status) => {
    dispatch(sensorToggled(name, status));
  });
  socket.on('directoryChanged', (name) => {
    dispatch(directoryChanged(name));
  });
  socket.on('cycle', (frames) => {
    dispatch(cycled(frames));
  });
  socket.on('autorun', (autorun) => {
    dispatch(autorunToggled(autorun));
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