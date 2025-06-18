import type { AppUCsLoaderInput } from '../../../app/index.js';
import { ProductUCsLoader } from '../../../product/index.js';
import type { Configurable, EmailManager, FSManager, I18nManager, JobManager, Logger, SettingsManager, Worker } from '../../../std/index.js';
import { type UCManager } from '../../../uc/index.js';
import { ServerInstaller } from './ServerInstaller.js';
import type { ServerManager, ServerManagerSettings } from './ServerManager.js';
type S = Pick<ServerManagerSettings, 'server_static_dir_path' | 'server_tmp_path'>;
type Input = Pick<AppUCsLoaderInput, 'appsRootPath' | 'srcImporter'> & {
    autoMountUCs?: boolean;
};
export declare class ServerBooter implements Configurable<S>, Worker<Input, Promise<void>> {
    private emailManager;
    private fsManager;
    private i18nManager;
    private jobManager;
    private logger;
    private productUCsLoader;
    private serverManager;
    private serverInstaller;
    private settingsManager;
    private ucManager;
    constructor(emailManager: EmailManager, fsManager: FSManager, i18nManager: I18nManager, jobManager: JobManager, logger: Logger, productUCsLoader: ProductUCsLoader, serverManager: ServerManager, serverInstaller: ServerInstaller, settingsManager: SettingsManager<S>, ucManager: UCManager);
    s(): S;
    exec({ appsRootPath, autoMountUCs, srcImporter, }: Input): Promise<void>;
    private mountUC;
}
export {};
