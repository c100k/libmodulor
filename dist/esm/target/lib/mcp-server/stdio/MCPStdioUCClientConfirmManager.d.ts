import { WordingManager } from '../../../../i18n/index.js';
import type { UCClientConfirmManager, UCDef, UCInput, UCOPIBase } from '../../../../uc/index.js';
export declare class MCPStdioUCClientConfirmManager implements UCClientConfirmManager {
    private wordingManager;
    constructor(wordingManager: WordingManager);
    exec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(ucd: UCDef<I, OPI0, OPI1>): Promise<boolean>;
}
