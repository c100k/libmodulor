import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type DateTimeFormat = string;
export declare class TDateTimeFormat extends TString<DateTimeFormat> {
    tName(): TName;
    example(): DateTimeFormat;
}
