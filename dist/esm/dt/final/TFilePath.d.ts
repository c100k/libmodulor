import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
import type { FileMimeType } from './TFileMimeType.js';
import type { FileName } from './TFileName.js';
import type { UIntQuantity } from './TUIntQuantity.js';
export type FilePath = string;
export declare class TFilePath extends TString<FilePath> {
    static readonly ABS_PATH: FilePath;
    static readonly FILE_NAME: FileName;
    static readonly FILE_SIZE: UIntQuantity;
    static readonly MIME_TYPE: FileMimeType;
    static readonly FORMAT: RegExp;
    constructor(constraints?: TStringConstraints);
    tName(): TName;
    example(): FilePath;
}
