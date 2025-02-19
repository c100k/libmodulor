import type { NumIndex, UIntQuantity } from '../../dt/index.js';
/**
 * Assert that the value is defined
 * @param value
 * @param key
 * @see isBlank
 */
export declare function assertIsDefined<T>(value: T, key: string): asserts value is NonNullable<T>;
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
export declare function isBlank<T>(value: T | T[] | undefined | null): value is undefined | null;
/**
 * Get an array filled with `[0 .. n-1]`
 * @param n
 * @returns
 */
export declare function range(n: UIntQuantity): NumIndex[];
/**
 * Get a random item from the array
 *
 * Although the name is inspired by Ruby's, the signature and implementation is not exactly the same (for now).
 *
 * @param items
 * @returns
 */
export declare function sample<T>(items: T[]): T | null;
/**
 * Get an array of size `n` filled with `val`
 * @param val
 * @param n
 * @returns
 */
export declare function tupleOf<T>(val: T, n: UIntQuantity): T[];
