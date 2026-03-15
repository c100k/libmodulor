import type { Configurable, SettingsManager } from '../../std/index.js';
import type { UCData } from '../data.js';
import { type UCDataStore, type UCDataStoreReadOpts, type UCDataStoreReadResponse, type UCDataStoreRecord, type UCDataStoreTx, type UCDataStoreWriteProjectionSpecificBinding } from '../data-store.js';
import type { UCInput } from '../input.js';
import type { UCSettings } from '../settings.js';
type TxState = 'committed' | 'pending' | 'rollbacked';
type S = Pick<UCSettings, 'uc_data_store_mode'>;
export declare class InMemoryUCDataStore implements Configurable<S>, UCDataStore {
    protected settingsManager: SettingsManager<S>;
    entries: UCDataStoreRecord<any, any>[];
    tx: TxState | undefined;
    constructor(settingsManager: SettingsManager<S>);
    s(): S;
    clear(): Promise<void>;
    destroy(): Promise<void>;
    exists(): Promise<boolean>;
    init(): Promise<void>;
    initSync(): void;
    read<I extends UCInput | undefined = undefined, D extends UCData | null = null>(opts?: UCDataStoreReadOpts<I, D>): Promise<UCDataStoreReadResponse<I, D>>;
    readProjection<T extends object>(): Promise<T[]>;
    startTx(): Promise<UCDataStoreTx['ref']>;
    supportedSpecificBindings(): UCDataStoreWriteProjectionSpecificBinding[];
    testKey(): Promise<void>;
    write<I extends UCInput | undefined = undefined, D extends UCData | null = null>(record: UCDataStoreRecord<I, D>): Promise<void>;
    writeBulk<I extends UCInput | undefined = undefined, D extends UCData | null = null>(records: UCDataStoreRecord<I, D>[]): Promise<void>;
    writeProjection(): Promise<void>;
}
export {};
