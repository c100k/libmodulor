import type { DirPath, File, FileExtension, FileName, FilePath } from '../../dt/index.js';
import type { Clearable } from '../../utils/index.js';
import { type FSManager, type FSManagerCatOpts, type FSManagerChmodMode, type FSManagerItemInfo, type FSManagerLsItem, type FSManagerLsOpts, type Pathname } from '../FSManager.js';
export declare class FakeFSManager implements Clearable, FSManager {
    entries: Map<FilePath, {
        content: ArrayBuffer | string;
        mode: FSManagerChmodMode;
    }>;
    constructor();
    clear(): Promise<void>;
    canHandleFiles(): Promise<boolean>;
    cat<T extends string>(path: FilePath, _opts?: FSManagerCatOpts): Promise<T>;
    chmod(path: Pathname, mode: FSManagerChmodMode): Promise<void>;
    cp(src: Pathname, dest: Pathname): Promise<void>;
    echoIn<T extends string>(src: FilePath, content: T): Promise<void>;
    exists(_path: Pathname): Promise<boolean>;
    fileExtension(fileName: FileName): FileExtension;
    info(_path: Pathname): Promise<FSManagerItemInfo>;
    ls(path: DirPath, _opts?: FSManagerLsOpts): Promise<FSManagerLsItem[]>;
    mkdir(path: DirPath): Promise<void>;
    path(...parts: Pathname[]): Pathname;
    pickFiles(): Promise<File[]>;
    rm(path: Pathname): Promise<void>;
    touch<T extends ArrayBuffer | string>(path: FilePath, content: T): Promise<void>;
}
