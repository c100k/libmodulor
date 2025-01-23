import { UCDataStoreExternalResourceManager } from '../../../std/impl/UCDataStoreExternalResourceManager.js';
import { ExternalResourceInstaller, type Logger, type Worker } from '../../../std/index.js';
export declare class ServerInstaller implements Worker<void, Promise<void>> {
    private externalResourceInstaller;
    private logger;
    private ucDataStoreERM;
    constructor(externalResourceInstaller: ExternalResourceInstaller, logger: Logger, ucDataStoreERM: UCDataStoreExternalResourceManager);
    exec(): Promise<void>;
    private onFeedback;
}
