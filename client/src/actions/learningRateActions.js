export const RATES_RECEIVED = 'RATES_RECEIVED';

export function learningRatesReceived(rate, probSphere, minConn, maxConn) {
  return { type: RATES_RECEIVED,
    rate: rate,
    probSphere: probSphere,
    minConn: minConn,
    maxConn: maxConn
  }
}

export function setLearningRates(rate, probSphere, minConn, maxConn) {
  return function(dispatch, getState) {
    let { socket } = getState();
    socket.socket.emit('learningRates', rate, probSphere, minConn, maxConn);
  }
}