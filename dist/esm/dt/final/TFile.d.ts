import type { ConstraintsForHuman, TName } from '../base/TBase.js';
import { TObject } from '../base/TObject.js';
import type { HTMLInputType } from '../targets/web.js';
import type { Validation } from '../Validation.js';
import { type FileMimeType } from './TFileMimeType.js';
import { type FileName } from './TFileName.js';
import { type FilePath } from './TFilePath.js';
import type { UIntQuantity } from './TUIntQuantity.js';
export type File = {
    name: FileName;
    size: UIntQuantity;
    type: FileMimeType;
    uri: FilePath;
};
export interface TFileConstraints {
    accept: FileMimeType[];
    maxSizeInBytes?: UIntQuantity;
    minSizeInBytes?: UIntQuantity;
}
export declare class TFile extends TObject<File> {
    protected fileConstraints: TFileConstraints;
    static readonly UNITS: string[];
    constructor(fileConstraints: TFileConstraints);
    tName(): TName;
    example(): File;
    getConstraintsForHuman(): ConstraintsForHuman | null;
    htmlInputType(): HTMLInputType;
    validate(): Validation;
    getFileConstraints(): TFileConstraints;
    fmtBytes(bytes: number, decimals?: number): string;
    withOneExample(name: File['name']): this;
}
