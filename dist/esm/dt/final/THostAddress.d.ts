import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type HostAddress = string;
export declare class THostAddress extends TString<HostAddress> {
    tName(): TName;
    example(): HostAddress;
}
