import type { AppUCsLoaderInput } from '../../../app/index.js';
import { ProductUCsLoader } from '../../../product/index.js';
import type { I18nManager, Logger, Worker } from '../../../std/index.js';
import { type UCManager } from '../../../uc/index.js';
import type { ServerManager } from '../server/ServerManager.js';
type Input = Pick<AppUCsLoaderInput, 'appsRootPath' | 'srcImporter'>;
export declare class MCPServerBooter implements Worker<Input, Promise<void>> {
    private i18nManager;
    private logger;
    private productUCsLoader;
    private serverManager;
    private ucManager;
    constructor(i18nManager: I18nManager, logger: Logger, productUCsLoader: ProductUCsLoader, serverManager: ServerManager, ucManager: UCManager);
    exec({ appsRootPath, srcImporter }: Input): Promise<void>;
}
export {};
