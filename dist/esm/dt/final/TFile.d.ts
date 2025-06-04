import type { TName } from '../base/TBase.js';
import { TObject } from '../base/TObject.js';
import type { HTMLInputType } from '../targets/web.js';
import type { Validation } from '../Validation.js';
import { type FileMimeType, type TFileMimeTypeConstraints } from './TFileMimeType.js';
import { type FileName } from './TFileName.js';
import { type FilePath } from './TFilePath.js';
export type File = {
    name: FileName;
    path: FilePath;
    type: FileMimeType;
};
export interface TFileConstraints {
    type: TFileMimeTypeConstraints;
}
export declare class TFile extends TObject<File> {
    protected fileConstraints: TFileConstraints;
    constructor(fileConstraints: TFileConstraints);
    tName(): TName;
    example(): File;
    htmlInputType(): HTMLInputType;
    validate(): Validation;
}
