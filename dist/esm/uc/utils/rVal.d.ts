import type { Value } from '../value.js';
/**
 * Read the value as a primitive
 *
 * To be used when the field has a 0..1 cardinality.
 *
 * @param value
 * @param or
 * @returns
 */
export declare function rVal0<T>(value: Value<T>, or?: T): T | null;
/**
 * Require the value as a primitive
 *
 * To be used when the field has a 1..1 cardinality.
 *
 * @param value
 * @returns
 */
export declare function reqVal0<T>(value: Value<T>): T;
/**
 * Get the value as an array
 *
 * To be used when the field has a 0..* cardinality.
 *
 * @param value
 * @returns
 */
export declare function rValArr<T>(value: Value<T>): T[];
