export const SENSOR_NAMES = 'SENSOR_NAMES';
export const SENSOR_STATUSES = 'SENSOR_STATUSES';
export const SENSOR_TOGGLED = 'SENSOR_TOGGLED';

export function sensorNames(sensors) {
    return { type: SENSOR_NAMES, sensors: sensors }
}

export function sensorStatuses(sensors) {
    return { type: SENSOR_STATUSES, sensors: sensors }
}

export function toggleSensor(name, status) {
    return function(dispatch, getState) {
        let { socket } = getState();
        socket.socket.emit('toggleSensor', name, status);
    }
}

export function sensorToggled(name, status) {
    return { type: SENSOR_TOGGLED, name: name, status: status }
}