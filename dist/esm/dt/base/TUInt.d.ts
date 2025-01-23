import type { Unit } from '../../utils/index.js';
import type { TName } from './TBase.js';
import { TInt } from './TInt.js';
import type { TNumberConstraints } from './TNumber.js';
export type UInt = number;
export type TUIntConstraints = TNumberConstraints<UInt>;
export declare class TUInt<T extends UInt = UInt> extends TInt<T> {
    constructor(constraints?: TUIntConstraints, unit?: Unit, step?: T);
    tName(): TName;
    example(): T;
    min(): NonNullable<TUIntConstraints['min']>;
}
