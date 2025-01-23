import type { SemVerVersion } from '../../../dt/index.js';
import { WordingManager } from '../../../i18n/index.js';
import { type FSManager, type I18nManager, type PromptManager, type Worker } from '../../../std/index.js';
import { type UC, type UCInput, type UCManager, type UCOPIBase } from '../../../uc/index.js';
interface Input<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    uc: UC<I, OPI0, OPI1>;
}
export declare class CommandExecutor implements Worker<Input, Promise<void>> {
    private fsManager;
    private i18nManager;
    private promptManager;
    private ucManager;
    private wordingManager;
    private static DEFAULT_VERSION;
    private static VERSION_FILE_NAME;
    private static VERSION_FETCH_MAX_TRIES;
    private static VERSION_FETCH_START_PATH;
    constructor(fsManager: FSManager, i18nManager: I18nManager, promptManager: PromptManager, ucManager: UCManager, wordingManager: WordingManager);
    exec({ uc }: Input): Promise<void>;
    fieldsForFlags(uc: UC): ReturnType<UC['inputFieldsInsensitive']>;
    version(): Promise<SemVerVersion>;
    private promptForSensitiveFields;
}
export {};
