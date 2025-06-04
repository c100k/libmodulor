import { type Knex } from 'knex';
import type { FilePath, UIntQuantity } from '../../dt/index.js';
import type { Configurable, Settings, SettingsManager } from '../../std/index.js';
import type { UCData } from '../data.js';
import type { UCDataStore, UCDataStoreReadOpts, UCDataStoreReadProjectionOpts, UCDataStoreReadResponse, UCDataStoreRecord, UCDataStoreTx, UCDataStoreWriteOpts, UCDataStoreWriteProjectionOpts, UCDataStoreWriteProjectionSpecificBinding } from '../data-store.js';
import type { UCInput } from '../input.js';
import type { UCSettings } from '../settings.js';
/**
 * @see https://knexjs.org/guide/#configuration-options
 * @see https://knexjs.org/guide/#pool
 */
export interface KnexUCDataStoreSettings extends Settings {
    knex_uc_data_store_conn_string: `postgresql://${string}`;
    knex_uc_data_store_file_path: FilePath | ':memory:';
    knex_uc_data_store_pool_max: UIntQuantity;
    knex_uc_data_store_pool_min: UIntQuantity;
    knex_uc_data_store_type: 'pg' | 'sqlite3';
}
type S = KnexUCDataStoreSettings & Pick<UCSettings, 'uc_data_store_ucs_dataset_name'>;
export declare class KnexUCDataStore implements Configurable<S>, UCDataStore {
    protected settingsManager: SettingsManager<S>;
    protected config: Knex.Config;
    protected client: Knex;
    constructor(settingsManager: SettingsManager<S>);
    s(): S;
    clear(): Promise<void>;
    destroy(): Promise<void>;
    exists(): Promise<boolean>;
    initTx(): Promise<UCDataStoreTx['ref']>;
    install(): Promise<void>;
    read<I extends UCInput | undefined = undefined, D extends UCData | null = null>(opts?: UCDataStoreReadOpts<I, D>): Promise<UCDataStoreReadResponse<I, D>>;
    readProjection<T extends object>(name: string, opts?: UCDataStoreReadProjectionOpts<T>): Promise<T[]>;
    supportedSpecificBindings(): UCDataStoreWriteProjectionSpecificBinding[];
    testKey(_encryptionKey: Uint8Array): Promise<void>;
    write<I extends UCInput | undefined = undefined, D extends UCData | null = null>(record: UCDataStoreRecord<I, D>, opts?: UCDataStoreWriteOpts): Promise<void>;
    writeBulk<I extends UCInput | undefined = undefined, D extends UCData | null = null>(records: UCDataStoreRecord<I, D>[], opts?: UCDataStoreWriteOpts): Promise<void>;
    writeProjection<T extends object>(name: string, data: T, opts?: UCDataStoreWriteProjectionOpts): Promise<void>;
    private fillConfig;
    private fillConfigForPG;
    private fillConfigForSQLite3;
    private filter;
    private mapRecordToRow;
    private mapRowToRecord;
    private parseJSONColIfNecessary;
    private migration001CreateMainTable;
}
export {};
