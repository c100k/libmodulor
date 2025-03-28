import type { TName } from '../base/TBase.js';
import { TUInt, type UInt } from '../base/TUInt.js';
export type Timestamp = UInt;
export declare class TTimestamp extends TUInt {
    tName(): TName;
    example(): Timestamp;
    fmt(ifNullOrUndefined?: string | undefined): string;
}
