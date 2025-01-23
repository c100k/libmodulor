import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type BarCode = string;
export declare class TBarCode extends TString<BarCode> {
    tName(): TName;
    example(): BarCode;
}
