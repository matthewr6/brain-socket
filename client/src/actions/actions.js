export const CYCLED = 'CYCLED';
export const AUTORUN_TOGGLED = 'AUTORUN_TOGGLED';

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

export function loadState(loadName) {
    return function(dispatch, getState) {
        let { socket } = getState();
        socket.socket.emit('load', loadName);
    }
}

export function toggleAutorun(autorun) {
    return function(dispatch, getState) {
        let { socket } = getState();
        socket.socket.emit('autorun', autorun);
    }
}

export function autorunToggled(autorun) {
    return { type: AUTORUN_TOGGLED, autorun: autorun };
}