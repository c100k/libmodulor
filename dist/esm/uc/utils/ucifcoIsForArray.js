import { UCInputFieldChangeOperator } from '../input-field.js';
/**
 * Check whether a {@link UCInputFieldChangeOperator} is for an array or not.
 *
 * @param op
 * @returns
 */
export function ucifcoIsForArray(op) {
    return [
        UCInputFieldChangeOperator.ADD,
        UCInputFieldChangeOperator.REMOVE,
    ].includes(op);
}
