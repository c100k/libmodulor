import type { Unit } from '../../utils/index.js';
import type { RNInputMode } from '../targets/rn.js';
import type { Validation } from '../Validation.js';
import type { TName } from './TBase.js';
import { TNumber, type TNumberConstraints } from './TNumber.js';
export type Int = number;
export type TIntConstraints = TNumberConstraints<Int>;
export declare class TInt<T extends Int = Int> extends TNumber<T> {
    static readonly DEFAULT_MAX: Int;
    static readonly DEFAULT_MIN: Int;
    constructor(constraints?: TIntConstraints, unit?: Unit, step?: T);
    tName(): TName;
    assign(raw: unknown): this;
    example(): T;
    getConstraints(): TIntConstraints | undefined;
    max(): NonNullable<TIntConstraints['max']>;
    min(): NonNullable<TIntConstraints['min']>;
    rnInputMode(): RNInputMode;
    validate(): Validation;
}
