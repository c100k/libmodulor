import type { DataType } from '../../dt/index.js';
import type { Value } from '../value.js';
export declare function rVal0<T extends DataType>(value: Value<T>, or?: T): T | null;
export declare function reqVal0<T extends DataType>(value: Value<T>): T;
export declare function rValArr<T extends DataType>(value: Value<T>): T[];
