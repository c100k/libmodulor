import type { DirPath, FilePath } from '../../../../dt/index.js';
import type { FSManager, Worker } from '../../../../std/index.js';
export type Files = Map<FilePath[], string>;
interface Input {
    files: Files;
    rootPath: DirPath;
}
export declare class SrcFilesGenerator implements Worker<Input, Promise<void>> {
    private fsManager;
    constructor(fsManager: FSManager);
    exec({ files, rootPath }: Input): Promise<void>;
}
export {};
