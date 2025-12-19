import type { TName } from '../base/TBase.js';
import { TObject } from '../base/TObject.js';
import type { HTMLInputType } from '../targets/web.js';
import type { Validation } from '../Validation.js';
import { type FileMimeType, type TFileMimeTypeConstraints } from './TFileMimeType.js';
import { type FileName } from './TFileName.js';
import { type FilePath } from './TFilePath.js';
import type { UIntQuantity } from './TUIntQuantity.js';
export type File = {
    name: FileName;
    path: FilePath;
    size: UIntQuantity;
    type: FileMimeType;
};
export interface TFileConstraints {
    maxSizeInBytes?: UIntQuantity;
    minSizeInBytes?: UIntQuantity;
    type: TFileMimeTypeConstraints;
}
export declare class TFile extends TObject<File> {
    protected fileConstraints: TFileConstraints;
    static readonly UNITS: string[];
    constructor(fileConstraints: TFileConstraints);
    tName(): TName;
    example(): File;
    htmlInputType(): HTMLInputType;
    validate(): Validation;
    allowed(): FileMimeType[];
    fmtBytes(bytes: number, decimals?: number): string;
    withOneExample(name: File['name']): this;
}
