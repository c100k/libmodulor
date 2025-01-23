import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
import type { PersonFirstname } from './TPersonFirstname.js';
import type { PersonLastname } from './TPersonLastname.js';
export type PersonFullname = `${PersonFirstname} ${PersonLastname}`;
export declare class TPersonFullname extends TString<PersonFullname> {
    static readonly FORMAT: RegExp;
    constructor(constraints?: TStringConstraints);
    tName(): TName;
    example(): PersonFullname;
}
