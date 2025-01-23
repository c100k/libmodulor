import type { DirPath, File, FileExtension, FileName, FilePath } from '../../dt/index.js';
import type { FSManager, FSManagerCatOpts, FSManagerChmodMode, FSManagerFilePickerOpts, FSManagerFilePickerSource, FSManagerItemInfo, FSManagerLsItem, FSManagerLsOpts, FSManagerMkdirOpts, Pathname } from '../FSManager.js';
export declare class WebFSManager implements FSManager {
    canHandleFiles(): Promise<boolean>;
    cat<T extends string>(_path: FilePath, _opts?: FSManagerCatOpts): Promise<T>;
    chmod(_path: Pathname, _mode: FSManagerChmodMode): Promise<void>;
    cp(_src: Pathname, _dest: Pathname): Promise<void>;
    echoIn<T extends string>(_src: FilePath, _content: T): Promise<void>;
    exists(_path: Pathname): Promise<boolean>;
    fileExtension(_fileName: FileName): FileExtension;
    info(_path: Pathname): Promise<FSManagerItemInfo>;
    ls(_path: DirPath, _opts?: FSManagerLsOpts): Promise<FSManagerLsItem[]>;
    mkdir(_path: DirPath, _opts?: FSManagerMkdirOpts): Promise<void>;
    path(..._parts: Pathname[]): Pathname;
    pickFiles(_source: FSManagerFilePickerSource, _opts?: FSManagerFilePickerOpts): Promise<File[]>;
    rm(_path: Pathname): Promise<void>;
    touch<T extends string>(_path: FilePath, _content: T): Promise<void>;
}
