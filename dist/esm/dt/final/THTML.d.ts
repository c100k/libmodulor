import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type HTML = string;
export declare class THTML extends TString<HTML> {
    tName(): TName;
    example(): HTML;
    isPotentiallyLong(): boolean;
}
