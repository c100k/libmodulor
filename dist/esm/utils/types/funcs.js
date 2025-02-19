import { IllegalArgumentError } from '../../error/index.js';
/**
 * Assert that the value is defined
 * @param value
 * @param key
 * @see isBlank
 */
export function assertIsDefined(value, key) {
    if (isBlank(value)) {
        throw new IllegalArgumentError(`${key} is required`);
    }
}
/**
 * Checker whether the value is blank or not
 *
 * Blank means `undefined`, `null`, `''` (if string), `[]` (if array).
 *
 * This is insipred by Ruby's `blank?` method.
 *
 * @param value
 * @returns
 */
export function isBlank(value) {
    return (value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim().length === 0) ||
        (Array.isArray(value) && value.length === 0));
}
/**
 * Get an array filled with `[0 .. n-1]`
 * @param n
 * @returns
 */
export function range(n) {
    const items = [];
    for (let i = 0; i < n; i++) {
        items.push(i);
    }
    return items;
}
/**
 * Get a random item from the array
 *
 * Although the name is inspired by Ruby's, the signature and implementation is not exactly the same (for now).
 *
 * @param items
 * @returns
 */
export function sample(items) {
    if (items.length === 0) {
        return null;
    }
    return items[Math.floor(Math.random() * items.length)] ?? null;
}
/**
 * Get an array of size `n` filled with `val`
 * @param val
 * @param n
 * @returns
 */
export function tupleOf(val, n) {
    const items = [];
    for (let i = 0; i < n; i++) {
        items.push(val);
    }
    return items;
}
