import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type Address = string;
export declare class TAddress extends TString<Address> {
    tName(): TName;
    example(): Address;
}
