import { WordingManager } from '../../i18n/index.js';
import { ProductUCsLoader } from '../../product/index.js';
import type { I18nManager } from '../../std/index.js';
import type { CLIManager, Input, Output } from '../lib/cli/CLIManager.js';
import { CommandExecutor } from '../lib/cli/CommandExecutor.js';
export declare class NodeCoreCLIManager implements CLIManager {
    private commandExecutor;
    private i18nManager;
    private productUCsLoader;
    private wordingManager;
    constructor(commandExecutor: CommandExecutor, i18nManager: I18nManager, productUCsLoader: ProductUCsLoader, wordingManager: WordingManager);
    handleCommand({ appsRootPath, srcImporter, }: Input): Promise<Output>;
    private parseArgsConfig;
}
