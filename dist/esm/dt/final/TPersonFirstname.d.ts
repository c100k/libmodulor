import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
export type PersonFirstname = Capitalize<string>;
export declare class TPersonFirstname extends TString<PersonFirstname> {
    static readonly FORMAT: RegExp;
    constructor(constraints?: TStringConstraints);
    tName(): TName;
    example(): PersonFirstname;
}
