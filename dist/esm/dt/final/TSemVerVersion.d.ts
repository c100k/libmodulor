import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
export type SemVerVersion = `${number}.${number}.${number}`;
export declare class TSemVerVersion extends TString<SemVerVersion> {
    static readonly FORMAT: RegExp;
    constructor(constraints?: TStringConstraints);
    tName(): TName;
    example(): SemVerVersion;
}
