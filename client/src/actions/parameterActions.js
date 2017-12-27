export const RATES_RECEIVED = 'RATES_RECEIVED';
export const SKEWS_RECEIVED = 'SKEWS_RECEIVED';

export function learningRatesReceived(rate, probSphere, minConn, maxConn) {
  return {
    type: RATES_RECEIVED,
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

export function skewsReceived(axonSkew, minorSkew) {
  return {
    type: SKEWS_RECEIVED,
    axonSkew: axonSkew,
    minorSkew: minorSkew
  }
}

export function setSkews(axonSkew, minorSkew) {
  return function(dispatch, getState) {
    let { socket } = getState();
    socket.socket.emit('connectionSkew', axonSkew, minorSkew);
  }
}