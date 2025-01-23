import type { NumIndex, UIntQuantity } from '../../dt/index.js';
export declare function assertIsDefined<T>(value: T, key: string): asserts value is NonNullable<T>;
export declare function isBlank<T>(value: T | T[] | undefined | null): value is undefined | null;
export declare function range(n: UIntQuantity): NumIndex[];
export declare function sample<T>(items: T[]): T | null;
export declare function tupleOf<T>(val: T, n: UIntQuantity): T[];
