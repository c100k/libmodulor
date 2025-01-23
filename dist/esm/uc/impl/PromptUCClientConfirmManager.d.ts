import { WordingManager } from '../../i18n/index.js';
import type { PromptManager } from '../../std/index.js';
import type { UCClientConfirmManager } from '../client.js';
import type { UCDef } from '../def.js';
import type { UCInput } from '../input.js';
import type { UCOPIBase } from '../opi.js';
export declare class PromptUCClientConfirmManager implements UCClientConfirmManager {
    private promptManager;
    private wordingManager;
    private static N_ANSWERS;
    private static Y_ANSWERS;
    constructor(promptManager: PromptManager, wordingManager: WordingManager);
    exec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(ucd: UCDef<I, OPI0, OPI1>): Promise<boolean>;
    private isNo;
    private isYes;
}
