import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type JavaScript = string;
export declare class TJavaScript extends TString<JavaScript> {
    tName(): TName;
    example(): JavaScript;
    isPotentiallyLong(): boolean;
}
