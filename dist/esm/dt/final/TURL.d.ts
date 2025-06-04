import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
import type { RNInputMode } from '../targets/rn.js';
import type { HTMLInputType } from '../targets/web.js';
import type { Validation } from '../Validation.js';
export type URL = `http://${string}` | `https://${string}` | `ftp://${string}`;
export declare class TURL extends TString<URL> {
    static readonly FORMAT: RegExp;
    constructor(constraints?: TStringConstraints);
    tName(): TName;
    example(): URL;
    htmlInputType(): HTMLInputType;
    rnInputMode(): RNInputMode;
    validate(): Validation;
    private isLocalhost;
}
