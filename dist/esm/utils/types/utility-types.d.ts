/**
 * Extract a subset of a union type in a strict manner
 *
 * @example
 *
 * ```
 * type Color = 'red' | 'orange' | 'green';
 * type PassColor = Extract<Color, 'green' | 'toto'>; // Does not trigger any error
 * type PassColor = ExtractStrict<Color, 'green' | 'toto'>; // Type '"green" | "toto"' does not satisfy the constraint 'Color'. Type '"toto"' is not assignable to type 'Color'.
 * ```
 */
export type ExtractStrict<T, U extends T> = Extract<T, U>;
/**
 * Get a type corresponding to T with all the properties `NonNullable`, recursively
 */
export type RecursiveNonNullable<T> = {
    [K in keyof T]-?: RecursiveNonNullable<NonNullable<T[K]>>;
};
/**
 * Extract the string keys of T
 */
export type StringKeys<T extends object> = Extract<keyof T, string>;
