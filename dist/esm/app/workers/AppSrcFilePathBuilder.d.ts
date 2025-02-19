import type { FilePath } from '../../dt/index.js';
import type { FSManager, Logger, Worker } from '../../std/index.js';
import type { AppName } from '../manifest.js';
export interface Input {
    appName: AppName;
    /**
     * If set, it uses this value to build the path. Otherwise, it fallbacks on {@link appsRootPath}.
     * @see {@link APPS_ROOT_ALIAS}
     */
    appsRootAlias?: FilePath | undefined;
    /**
     * If `true`, it uses {@link APPS_ROOT_ALIAS} to build the path. Otherwise, it checks {@link appsRootAlias}.
     */
    appsRootAliasUseDefault?: boolean | undefined;
    /**
     * @defaultValue {@link APPS_ROOT_DIR_NAME}
     */
    appsRootPath?: FilePath | undefined;
    ext?: 'js' | 'ts' | undefined;
    /**
     * For example, it can be `[APP_MANIFEST_NAME]`.
     *
     * Do not include the extension. This must be passed by the caller via {@link ext}.
     * Indeed, depending on the context, the extension is not needed (e.g. in tests).
     */
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
