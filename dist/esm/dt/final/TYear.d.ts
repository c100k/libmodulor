import type { TName } from '../base/TBase.js';
import { TUInt, type TUIntConstraints, type UInt } from '../base/TUInt.js';
export type Year = UInt;
export declare class TYear extends TUInt<Year> {
    constructor(constraints?: TUIntConstraints);
    tName(): TName;
    example(): Year;
    fmt(ifNullOrUndefined?: string | undefined): string;
}
