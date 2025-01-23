import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
import type { RNInputMode } from '../targets/rn.js';
import type { HTMLInputType } from '../targets/web.js';
export type DomainName = string;
export declare class TDomainName extends TString<DomainName> {
    static readonly FORMAT: RegExp;
    constructor(constraints?: TStringConstraints);
    tName(): TName;
    example(): DomainName;
    htmlInputType(): HTMLInputType;
    rnInputMode(): RNInputMode;
}
