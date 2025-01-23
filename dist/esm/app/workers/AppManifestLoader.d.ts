import type { Worker } from '../../std/index.js';
import type { SrcImporter } from '../../utils/index.js';
import type { AppManifest, AppManifestSourceSafe, AppName } from '../manifest.js';
import { AppSrcFilePathBuilder, type Input as AppSrcFilePathBuilderInput } from './AppSrcFilePathBuilder.js';
export type Input = Omit<AppSrcFilePathBuilderInput, 'filePathParts'> & {
    appName: AppName;
    srcImporter: SrcImporter<AppManifestSourceSafe>;
};
type Output = AppManifest;
export declare class AppManifestLoader implements Worker<Input, Promise<Output>> {
    private appSrcFilePathBuilder;
    constructor(appSrcFilePathBuilder: AppSrcFilePathBuilder);
    exec({ appName, appsRootAlias, appsRootAliasUseDefault, appsRootPath, ext, srcImporter, }: Input): Promise<Output>;
}
export {};
