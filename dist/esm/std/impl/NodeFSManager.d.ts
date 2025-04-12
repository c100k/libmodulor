import type { DirPath, File, FileExtension, FileName, FilePath } from '../../dt/index.js';
import { type FSManager, type FSManagerCatOpts, type FSManagerChmodMode, type FSManagerFilePickerOpts, type FSManagerFilePickerSource, type FSManagerItemInfo, type FSManagerLsItem, type FSManagerLsOpts, type FSManagerMkdirOpts, type Pathname } from '../FSManager.js';
export declare class NodeFSManager implements FSManager {
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
    private determineType;
}
