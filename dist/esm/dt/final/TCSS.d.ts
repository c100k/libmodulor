import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type CSS = string;
export declare class TCSS extends TString<CSS> {
    tName(): TName;
    example(): CSS;
    isPotentiallyLong(): boolean;
}
