import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
import type { RNInputMode } from '../targets/rn.js';
import type { HTMLInputType } from '../targets/web.js';
export type Email = string;
export declare class TEmail extends TString<Email> {
    static readonly FORMAT: RegExp;
    constructor(constraints?: TStringConstraints);
    tName(): TName;
    example(): Email;
    htmlInputType(): HTMLInputType;
    rnInputMode(): RNInputMode;
}
