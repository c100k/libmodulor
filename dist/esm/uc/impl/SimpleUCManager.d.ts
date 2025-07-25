import { type Provider } from 'inversify';
import type { ClockManager, CryptoManager, Logger } from '../../std/index.js';
import type { UCClientConfirmManager } from '../client.js';
import type { UCData } from '../data.js';
import type { UCDataStore, UCDataStoreRecord } from '../data-store.js';
import { UCOutputReader } from '../helpers/UCOutputReader.js';
import type { UCInit } from '../init.js';
import type { UCInput } from '../input.js';
import type { UCMain } from '../main.js';
import type { UCManager, UCManagerPersistOpts } from '../manager.js';
import type { UCOPIBase } from '../opi.js';
import type { UCOutputOrNothing } from '../output.js';
import type { UC } from '../UC.js';
import { UCExecChecker } from '../workers/UCExecChecker.js';
import { UCInputFilesProcessor } from '../workers/UCInputFilesProcessor.js';
import { UCInputValidator } from '../workers/UCInputValidator.js';
export declare class SimpleUCManager implements UCManager {
    private ucClientConfirmManager;
    private clockManager;
    private cryptoManager;
    private logger;
    private ucDataStore;
    private ucExecChecker;
    private ucInputFilesProcessor;
    private ucInputValidator;
    private ucInitProvider;
    private ucMainProvider;
    private tx?;
    constructor(ucClientConfirmManager: UCClientConfirmManager, clockManager: ClockManager, cryptoManager: CryptoManager, logger: Logger, ucDataStore: UCDataStore, ucExecChecker: UCExecChecker, ucInputFilesProcessor: UCInputFilesProcessor, ucInputValidator: UCInputValidator, ucInitProvider: Provider<UCInit>, ucMainProvider: Provider<UCMain>);
    commitTx(): Promise<void>;
    confirmClient<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>): Promise<boolean>;
    execClient<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>): Promise<UCOutputReader<I, OPI0, OPI1>>;
    execServer<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>): Promise<UCOutputOrNothing<OPI0, OPI1>>;
    initServer<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>): Promise<void>;
    startTx(): Promise<void>;
    persist<I extends UCInput | undefined = undefined, D extends UCData | null = null, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>, data?: D, opts?: UCManagerPersistOpts): Promise<UCDataStoreRecord<I, D>>;
    persistProjection<T extends object>(name: string, data: T): Promise<void>;
    rollbackTx(): Promise<void>;
}
