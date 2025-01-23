import type { ClockManager, CryptoManager, Worker } from '../std/index.js';
import { type UCDataStore } from '../uc/index.js';
interface Input {
    ucDataStore: UCDataStore;
}
export declare class UCDataStoreTester implements Worker<Input, Promise<void>> {
    private clockManager;
    private cryptoManager;
    static PROJECTION_NAME_1: string;
    private ucDataStore;
    private skipProjectionTesting;
    private entries;
    private exists;
    private filtersTestData;
    private readRes;
    constructor(clockManager: ClockManager, cryptoManager: CryptoManager);
    exec({ ucDataStore }: Input): Promise<void>;
    setSkipProjectionTesting(skipProjectionTesting: boolean): void;
    private buildEntries;
    private buildFiltersTestData;
    private buildUCInput;
    private expectXRecords;
    private insertEntries;
}
export {};
