import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
export type PersonLastname = Capitalize<string>;
export declare class TPersonLastname extends TString<PersonLastname> {
    static readonly FORMAT: RegExp;
    constructor(constraints?: TStringConstraints);
    tName(): TName;
    example(): PersonLastname;
}
