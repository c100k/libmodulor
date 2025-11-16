import { WordingManager } from '../../i18n/index.js';
import { type ProductManifest, ProductUCsLoader } from '../../product/index.js';
import type { CLIManager, Input, Output } from '../lib/cli/CLIManager.js';
import { CommandExecutor } from '../lib/cli/CommandExecutor.js';
export declare class NodeStricliCLIManager implements CLIManager {
    private commandExecutor;
    private productManifest;
    private productUCsLoader;
    private wordingManager;
    constructor(commandExecutor: CommandExecutor, productManifest: ProductManifest, productUCsLoader: ProductUCsLoader, wordingManager: WordingManager);
    handleCommand({ appsRootPath, srcImporter, }: Input): Promise<Output>;
}
