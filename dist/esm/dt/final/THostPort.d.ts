import type { TName } from '../base/TBase.js';
import { TUInt, type TUIntConstraints, type UInt } from '../base/TUInt.js';
export type HostPort = UInt;
export declare class THostPort extends TUInt<HostPort> {
    constructor(constraints?: TUIntConstraints);
    tName(): TName;
    example(): HostPort;
}
