export type ExtractStrict<T, U extends T> = Extract<T, U>;
export type RecursiveNonNullable<T> = {
    [K in keyof T]-?: RecursiveNonNullable<NonNullable<T[K]>>;
};
export type StringKeys<T extends object> = Extract<keyof T, string>;
