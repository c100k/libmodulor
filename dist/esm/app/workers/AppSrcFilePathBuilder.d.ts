import type { FilePath } from '../../dt/index.js';
import type { FSManager, Logger, Worker } from '../../std/index.js';
import type { AppName } from '../manifest.js';
export interface Input {
    appName: AppName;
    appsRootAlias?: FilePath | undefined;
    appsRootAliasUseDefault?: boolean | undefined;
    appsRootPath?: FilePath | undefined;
    ext?: 'js' | 'ts' | undefined;
    filePathParts: FilePath[];
}
type Output = FilePath;
export declare class AppSrcFilePathBuilder implements Worker<Input, Output> {
    private fsManager;
    private logger;
    constructor(fsManager: FSManager, logger: Logger);
    exec({ appName, appsRootAlias, appsRootAliasUseDefault, appsRootPath, ext, filePathParts, }: Input): Output;
}
export {};
