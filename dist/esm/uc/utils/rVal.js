import { isBlank } from '../../utils/index.js';
// NOTE : the "r" prefix stands for "read" and the "req" prefix stands for "require"
/**
 * Read the value as a primitive
 *
 * To be used when the field has a 0..1 cardinality.
 *
 * @param value
 * @param or
 * @returns
 */
// TODO : Find a way to return `T` when `or` is set (function override does not work)
export function rVal0(value, or) {
    if (isBlank(value)) {
        return or ?? null;
    }
    return Array.isArray(value) ? (value[0] ?? null) : value;
}
/**
 * Require the value as a primitive
 *
 * To be used when the field has a 1..1 cardinality.
 *
 * @param value
 * @returns
 */
export function reqVal0(value) {
    const val = rVal0(value);
    if (isBlank(val)) {
        throw new Error('The value is blank');
    }
    return val;
}
/**
 * Get the value as an array
 *
 * To be used when the field has a 0..* cardinality.
 *
 * @param value
 * @returns
 */
export function rValArr(value) {
    if (isBlank(value)) {
        return [];
    }
    return Array.isArray(value) ? value : [value];
}
