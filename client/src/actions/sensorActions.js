export const SENSORS_UPDATED = 'SENSORS_UPDATED';

export function updateSensors(sensors) {
    return { type: SENSORS_UPDATED, sensors: sensors }
}