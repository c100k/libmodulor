import type { D1Database } from '@cloudflare/workers-types';
import type { Configurable, SettingsManager } from '../../std/index.js';
import type { UCData } from '../data.js';
import type { UCDataStore, UCDataStoreReadOpts, UCDataStoreReadProjectionOpts, UCDataStoreReadResponse, UCDataStoreRecord, UCDataStoreTx, UCDataStoreWriteOpts, UCDataStoreWriteProjectionOpts, UCDataStoreWriteProjectionSpecificBinding } from '../data-store.js';
import type { UCInput } from '../input.js';
import type { UCSettings } from '../settings.js';
type S = Pick<UCSettings, 'uc_data_store_ucs_dataset_name'>;
export declare const ROW_COLS: (keyof UCDataStoreRecord)[];
/**
 * @alpha This implementation is still a WIP and needs improvement
 */
export declare class CloudflareD1UCDataStore implements Configurable<S>, UCDataStore {
    protected settingsManager: SettingsManager<S>;
    protected client?: D1Database | undefined;
    constructor(settingsManager: SettingsManager<S>);
    s(): S;
    clear(): Promise<void>;
    destroy(): Promise<void>;
    exists(): Promise<boolean>;
    init(): Promise<void>;
    initSync(): void;
    read<I extends UCInput | undefined = undefined, D extends UCData | null = null>(opts?: UCDataStoreReadOpts<I, D>): Promise<UCDataStoreReadResponse<I, D>>;
    readProjection<T extends object>(_name: string, _opts?: UCDataStoreReadProjectionOpts<T>): Promise<T[]>;
    startTx(): Promise<UCDataStoreTx['ref']>;
    supportedSpecificBindings(): UCDataStoreWriteProjectionSpecificBinding[];
    testKey(_encryptionKey: Uint8Array): Promise<void>;
    write<I extends UCInput | undefined = undefined, D extends UCData | null = null>(record: UCDataStoreRecord<I, D>, _opts?: UCDataStoreWriteOpts): Promise<void>;
    writeBulk<I extends UCInput | undefined = undefined, D extends UCData | null = null>(_records: UCDataStoreRecord<I, D>[], _opts?: UCDataStoreWriteOpts): Promise<void>;
    writeProjection<T extends object>(_name: string, _data: T, _opts?: UCDataStoreWriteProjectionOpts): Promise<void>;
    setClient(client: D1Database): void;
    private assertClient;
    private filter;
}
export {};
