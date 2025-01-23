import type { TName } from '../base/TBase.js';
import { TUInt, type UInt } from '../base/TUInt.js';
export type NumIndex = UInt;
export declare class TNumIndex extends TUInt {
    tName(): TName;
    example(): NumIndex;
}
