import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type FreeTextShort = string;
export declare class TFreeTextShort extends TString<FreeTextShort> {
    tName(): TName;
    example(): FreeTextShort;
}
