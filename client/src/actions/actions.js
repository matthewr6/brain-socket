export const CYCLED = 'CYCLED';

export function step(amount, generateFrames) {
    return function(dispatch, getState) {
        let { socket } = getState();
        socket.socket.emit('cycle', amount, generateFrames);
    }
}

export function cycled(frames) {
    return { type: CYCLED, frames: frames }
}

export function saveState(saveName) {
    return function(dispatch, getState) {
        let { socket } = getState();
        socket.socket.emit('save', saveName);
    }
}