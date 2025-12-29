import { injectable } from 'inversify';

import {
    type DirPath,
    type File,
    type FileExtension,
    type FileName,
    type FilePath,
    type FSManager,
    type FSManagerCatOpts,
    type FSManagerChmodMode,
    type FSManagerFilePickerOpts,
    type FSManagerFilePickerSource,
    type FSManagerItemInfo,
    type FSManagerLsItem,
    type FSManagerLsOpts,
    type FSManagerMkdirOpts,
    NotImplementedError,
    type Pathname,
} from '../../../../../../../dist/esm/index.js';

@injectable()
export class RNFSManager implements FSManager {
    public async canHandleFiles(): Promise<boolean> {
        throw new NotImplementedError<this>('canHandleFiles');
    }

    public async cat<T extends string>(
        _path: FilePath,
        _opts?: FSManagerCatOpts,
    ): Promise<T> {
        throw new NotImplementedError<this>('cat');
    }

    public async chmod(
        _path: Pathname,
        _mode: FSManagerChmodMode,
    ): Promise<void> {
        throw new NotImplementedError<this>('chmod');
    }

    public async cp(_src: Pathname, _dest: Pathname): Promise<void> {
        throw new NotImplementedError<this>('cp');
    }

    public async echoIn<T extends string>(
        _src: FilePath,
        _content: T,
    ): Promise<void> {
        throw new NotImplementedError<this>('echoIn');
    }

    public async exists(_path: Pathname): Promise<boolean> {
        throw new NotImplementedError<this>('exists');
    }

    public fileExtension(_fileName: FileName): FileExtension {
        throw new NotImplementedError<this>('fileExtension');
    }

    public async info(_path: Pathname): Promise<FSManagerItemInfo> {
        throw new NotImplementedError<this>('info');
    }

    public async ls(
        _path: DirPath,
        _opts?: FSManagerLsOpts,
    ): Promise<FSManagerLsItem[]> {
        throw new NotImplementedError<this>('ls');
    }

    public async mkdir(
        _path: DirPath,
        _opts?: FSManagerMkdirOpts,
    ): Promise<void> {
        throw new NotImplementedError<this>('mkdir');
    }

    public path(..._parts: Pathname[]): Pathname {
        throw new NotImplementedError<this>('path');
    }

    public async pickFiles(
        _source: FSManagerFilePickerSource,
        _opts?: FSManagerFilePickerOpts,
    ): Promise<File[]> {
        throw new NotImplementedError<this>('pickFiles');
    }

    public async rm(_path: Pathname): Promise<void> {
        throw new NotImplementedError<this>('rm');
    }

    public async touch<T extends ArrayBuffer | string>(
        _path: FilePath,
        _content: T,
    ): Promise<void> {
        throw new NotImplementedError<this>('touch');
    }
}
