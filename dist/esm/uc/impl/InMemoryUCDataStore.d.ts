import type { UCData } from '../data.js';
import type { UCDataStore, UCDataStoreReadOpts, UCDataStoreReadResponse, UCDataStoreRecord, UCDataStoreTx, UCDataStoreWriteProjectionSpecificBinding } from '../data-store.js';
import type { UCInput } from '../input.js';
type TxState = 'committed' | 'pending' | 'rollbacked';
export declare class InMemoryUCDataStore implements UCDataStore {
    entries: UCDataStoreRecord<any, any>[];
    tx: TxState | undefined;
    constructor();
    clear(): Promise<void>;
    destroy(): Promise<void>;
    exists(): Promise<boolean>;
    initTx(): Promise<UCDataStoreTx['ref']>;
    install(): Promise<void>;
    read<I extends UCInput | undefined = undefined, D extends UCData | null = null>(opts?: UCDataStoreReadOpts<I, D>): Promise<UCDataStoreReadResponse<I, D>>;
    readProjection<T extends object>(): Promise<T[]>;
    supportedSpecificBindings(): UCDataStoreWriteProjectionSpecificBinding[];
    testKey(): Promise<void>;
    write<I extends UCInput | undefined = undefined, D extends UCData | null = null>(record: UCDataStoreRecord<I, D>): Promise<void>;
    writeBulk<I extends UCInput | undefined = undefined, D extends UCData | null = null>(records: UCDataStoreRecord<I, D>[]): Promise<void>;
    writeProjection(): Promise<void>;
}
export {};
