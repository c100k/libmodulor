import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
export type PersonInitials = Uppercase<string>;
export declare class TPersonInitials extends TString<PersonInitials> {
    static readonly FORMAT: RegExp;
    constructor(constraints?: TStringConstraints);
    tName(): TName;
    example(): PersonInitials;
}
