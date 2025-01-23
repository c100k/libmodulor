import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type FreeTextLong = string;
export declare class TFreeTextLong extends TString<FreeTextLong> {
    tName(): TName;
    example(): FreeTextLong;
    isPotentiallyLong(): boolean;
}
