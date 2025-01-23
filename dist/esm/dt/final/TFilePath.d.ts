import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
export type FilePath = string;
export declare class TFilePath extends TString<FilePath> {
    static readonly FORMAT: RegExp;
    constructor(constraints?: TStringConstraints);
    tName(): TName;
    example(): FilePath;
}
