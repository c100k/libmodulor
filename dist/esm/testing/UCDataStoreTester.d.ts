import type { ClockManager, CryptoManager, Worker } from '../std/index.js';
import { type UCDataStore } from '../uc/index.js';
interface Input {
    ucDataStore: UCDataStore;
}
/**
 * Test that a {@link UCDataStore} conforms to the spec
 *
 * By default it runs tests on the projection mechanism.
 * Therefore, you need to create one in your implementation when creating your test suite.
 * See `src/uc/impl/KnexUCDataStore.test.ts` for an example.
 *
 * Otherwise you can just `skipProjectionTesting`, although it's not recommended.
 */
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
