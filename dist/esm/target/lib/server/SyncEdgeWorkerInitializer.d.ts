import type { AppUCsLoaderOutput } from '../../../app/index.js';
import type { I18nManager, JobManager, Logger, Worker } from '../../../std/index.js';
import type { ServerManager } from './ServerManager.js';
type Input = {
    autoMountUCs?: boolean;
    ucs: AppUCsLoaderOutput;
};
export declare class SyncEdgeWorkerInitializer implements Worker<Input, void> {
    private i18nManager;
    private jobManager;
    private logger;
    private serverManager;
    constructor(i18nManager: I18nManager, jobManager: JobManager, logger: Logger, serverManager: ServerManager);
    exec({ autoMountUCs, ucs }: Input): void;
    private mountUC;
}
export {};
