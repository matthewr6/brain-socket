export const OUTPUTS_UPDATED = 'OUTPUTS_UPDATED';

export function updateOutputs(outputs) {
    return { type: OUTPUTS_UPDATED, outputs: outputs }
}