import { WordingManager } from '../../i18n/index.js';
import type { Logger } from '../../std/index.js';
import type { UCClientConfirmManager } from '../client.js';
import type { UCDef } from '../def.js';
import type { UCInput } from '../input.js';
import type { UCOPIBase } from '../opi.js';
export declare class StaticUCClientConfirmManager implements UCClientConfirmManager {
    private logger;
    private wordingManager;
    constructor(logger: Logger, wordingManager: WordingManager);
    exec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(ucd: UCDef<I, OPI0, OPI1>): Promise<boolean>;
}
