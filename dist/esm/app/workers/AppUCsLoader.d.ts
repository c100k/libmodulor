import type { ProductAppReg } from '../../product/index.js';
import type { Logger, Worker } from '../../std/index.js';
import { type UC, UCBuilder, type UCDefSourceSafe } from '../../uc/index.js';
import type { SrcImporter } from '../../utils/index.js';
import type { AppManifestSourceSafe } from '../manifest.js';
import { AppManifestLoader } from './AppManifestLoader.js';
import type { Input as AppSrcFilePathBuilderInput } from './AppSrcFilePathBuilder.js';
import { UCDefLoader } from './UCDefLoader.js';
export interface Input {
    app: ProductAppReg;
    appsRootPath?: AppSrcFilePathBuilderInput['appsRootPath'];
    srcImporter: SrcImporter<AppManifestSourceSafe | UCDefSourceSafe>;
}
export type Output = UC<any, any, any>[];
export declare class AppUCsLoader implements Worker<Input, Promise<Output>> {
    private appManifestLoader;
    private logger;
    private ucBuilder;
    private ucDefLoader;
    constructor(appManifestLoader: AppManifestLoader, logger: Logger, ucBuilder: UCBuilder, ucDefLoader: UCDefLoader);
    exec({ app, appsRootPath, srcImporter, }: Input): Promise<Output>;
}
