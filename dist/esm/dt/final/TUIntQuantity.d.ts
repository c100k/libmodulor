import type { TName } from '../base/TBase.js';
import { TUInt, type UInt } from '../base/TUInt.js';
export type UIntQuantity = UInt;
export declare class TUIntQuantity extends TUInt {
    tName(): TName;
    example(): UIntQuantity;
}
