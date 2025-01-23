import type { DataType } from '../dt/index.js';
export type Value<T extends DataType> = T | T[] | null | undefined;
