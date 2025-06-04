import { injectable } from 'inversify';
import type {
    DirPath,
    File,
    FileExtension,
    FileName,
    FilePath,
    FSManager,
    FSManagerCatOpts,
    FSManagerChmodMode,
    FSManagerFilePickerOpts,
    FSManagerFilePickerSource,
    FSManagerItemInfo,
    FSManagerLsItem,
    FSManagerLsOpts,
    FSManagerMkdirOpts,
    Pathname,
} from 'libmodulor';

// TODO : Implement RNFSManager

@injectable()
export class RNFSManager implements FSManager {
    public async canHandleFiles(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    public async cat<T extends string>(
        _path: FilePath,
        _opts?: FSManagerCatOpts,
    ): Promise<T> {
        throw new Error('Method not implemented.');
    }

    public async chmod(
        _path: Pathname,
        _mode: FSManagerChmodMode,
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async cp(_src: Pathname, _dest: Pathname): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async echoIn<T extends string>(
        _src: FilePath,
        _content: T,
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async exists(_path: Pathname): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    public fileExtension(_fileName: FileName): FileExtension {
        throw new Error('Method not implemented.');
    }

    public async info(_path: Pathname): Promise<FSManagerItemInfo> {
        throw new Error('Method not implemented.');
    }

    public async ls(
        _path: DirPath,
        _opts?: FSManagerLsOpts,
    ): Promise<FSManagerLsItem[]> {
        throw new Error('Method not implemented.');
    }

    public async mkdir(
        _path: DirPath,
        _opts?: FSManagerMkdirOpts,
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public path(..._parts: Pathname[]): Pathname {
        throw new Error('Method not implemented.');
    }

    public async pickFiles(
        _source: FSManagerFilePickerSource,
        _opts?: FSManagerFilePickerOpts,
    ): Promise<File[]> {
        throw new Error('Method not implemented.');
    }

    public async rm(_path: Pathname): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async touch<T extends ArrayBuffer | string>(
        _path: FilePath,
        _content: T,
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
