import type { DirPath, FilePath, UIntQuantity } from '../../dt/index.js';
import { type FSManager, type Worker } from '../../std/index.js';
export interface Input {
    appPathFromUCDPath?: FilePath[];
    appsPath: DirPath;
    ignoreFilesWithSizeGreaterThan?: UIntQuantity;
    patternIndicatingUCD?: string;
}
export interface Output {
    apps: Map<FilePath, {
        path: FilePath;
        sizeInBytes: UIntQuantity;
    }[]>;
}
export declare class AppSrcBrowser implements Worker<Input, Promise<Output>> {
    private fsManager;
    constructor(fsManager: FSManager);
    exec({ appPathFromUCDPath, appsPath, ignoreFilesWithSizeGreaterThan, patternIndicatingUCD, }: Input): Promise<Output>;
}
