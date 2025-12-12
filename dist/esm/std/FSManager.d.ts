import type { DateISO8601, DirPath, File, FileExtension, FileMimeType, FileName, FilePath, UIntQuantity } from '../dt/index.js';
import type { EnumOf } from '../utils/index.js';
export type FSManagerChmodMode = number | string;
export interface FSManagerCatOpts {
    encoding?: FSManagerEncoding;
}
export type FSManagerEncoding = 'utf-8';
export interface FSManagerFilePickerOpts {
    max?: UIntQuantity;
    path?: FilePath;
}
export type FSManagerFilePickerSource = 'camera' | 'library' | 'path';
export declare const FSManagerItemInfoType: {
    readonly DIR: "DIR";
    readonly FILE: "FILE";
    readonly OTHER: "OTHER";
};
export type FSManagerItemInfoType = EnumOf<typeof FSManagerItemInfoType>;
export interface FSManagerItemInfo {
    base: string;
    birthtime: DateISO8601;
    dir: string;
    ext: string;
    mimeType: FileMimeType | null;
    name: string;
    root: string;
    size: UIntQuantity;
    type: FSManagerItemInfoType;
}
export interface FSManagerLsOpts {
    recursive?: boolean;
    withFullPath?: boolean;
}
export interface FSManagerLsItem {
    path: FilePath;
    type: FSManagerItemInfoType;
}
export interface FSManagerMkdirOpts {
    recursive?: boolean;
}
export type Pathname = DirPath | FilePath;
export interface FSManager {
    canHandleFiles(): Promise<boolean>;
    cat<T extends string>(path: FilePath, opts?: FSManagerCatOpts): Promise<T>;
    chmod(path: Pathname, mode: FSManagerChmodMode): Promise<void>;
    cp(src: Pathname, dest: Pathname): Promise<void>;
    echoIn<T extends string>(src: FilePath, content: T): Promise<void>;
    exists(path: Pathname): Promise<boolean>;
    fileExtension(fileName: FileName): FileExtension;
    info(path: Pathname): Promise<FSManagerItemInfo>;
    ls(path: DirPath, opts?: FSManagerLsOpts): Promise<FSManagerLsItem[]>;
    mkdir(path: DirPath, opts?: FSManagerMkdirOpts): Promise<void>;
    path(...parts: Pathname[]): Pathname;
    pickFiles(source: FSManagerFilePickerSource, opts?: FSManagerFilePickerOpts): Promise<File[]>;
    rm(path: Pathname): Promise<void>;
    touch<T extends ArrayBuffer | string>(path: FilePath, content: T): Promise<void>;
}
