import type { AppName } from '../app/index.js';
import type { UIntQuantity, UUID } from '../dt/index.js';
import type { Clearable, StringKeys } from '../utils/index.js';
import type { UCData } from './data.js';
import type { UCExecMode } from './exec.js';
import type { UCInput } from './input.js';
import type { UCName } from './metadata.js';
export type UCDataStoreDatasetName = string;
interface UCDataStoreQueryOpts {
}
export type UCDataStoreReadFilter<T> = T | T[];
export interface UCDataStoreReadFilters<I extends UCInput | undefined = undefined, D extends UCData | null = null> {
    aggregateId?: UCDataStoreReadFilter<UCDataStoreRecord<I, D>['aggregateId']> | undefined;
    appName?: UCDataStoreReadFilter<UCDataStoreRecord<I, D>['appName']> | undefined;
    idWithinInput?: Partial<{
        [key in StringKeys<NonNullable<I>>]: UUID;
    }> | undefined;
    name?: UCDataStoreReadFilter<UCDataStoreRecord<I, D>['name']> | undefined;
    organizationId?: UCDataStoreReadFilter<UCDataStoreRecord<I, D>['organizationId']> | undefined;
    userId?: UCDataStoreReadFilter<UCDataStoreRecord<I, D>['userId']> | undefined;
}
export interface UCDataStoreReadOpts<I extends UCInput | undefined = undefined, D extends UCData | null = null> extends UCDataStoreQueryOpts {
    filters?: UCDataStoreReadFilters<I, D>;
}
export type UCDataStoreReadProjectionOrderBy = 'asc' | 'desc';
export interface UCDataStoreReadProjectionOpts<T extends object> {
    limit?: UIntQuantity;
    orderBy?: Partial<Record<keyof T, UCDataStoreReadProjectionOrderBy>>;
}
export interface UCDataStoreReadResponse<I extends UCInput | undefined = undefined, D extends UCData | null = null> {
    records: UCDataStoreRecord<I, D>[];
}
export interface UCDataStoreTx {
    ref: {
        commit: () => Promise<void>;
        rollback: () => Promise<void>;
    };
}
export interface UCDataStoreWriteOpts extends UCDataStoreQueryOpts {
    tx?: UCDataStoreTx | undefined;
}
export type UCDataStoreWriteProjectionSpecificBinding = 'to_tsvector(?)' | (string & {});
export interface UCDataStoreWriteProjectionOpts extends UCDataStoreWriteOpts {
    specificBindings?: Record<string, 'to_tsvector(?)' | (string & {})> | undefined;
}
export interface UCDataStoreRecord<I extends UCInput | undefined = undefined, D extends UCData | null = null> {
    aggregateId: UUID;
    appName: AppName;
    createdAt: Date;
    data: D | null;
    executionMode: UCExecMode;
    id: UUID;
    input: I | null;
    name: UCName;
    organizationId: UUID | null;
    userId: UUID | null;
}
export interface UCDataStore extends Clearable {
    destroy(): Promise<void>;
    exists(): Promise<boolean>;
    initTx(): Promise<UCDataStoreTx['ref']>;
    install(): Promise<void>;
    read<I extends UCInput | undefined = undefined, D extends UCData | null = null>(opts?: UCDataStoreReadOpts<I, D>): Promise<UCDataStoreReadResponse<I, D>>;
    readProjection<T extends object>(name: string, opts?: UCDataStoreReadProjectionOpts<T>): Promise<T[]>;
    supportedSpecificBindings(): UCDataStoreWriteProjectionSpecificBinding[];
    testKey(encryptionKey: Uint8Array): Promise<void>;
    write<I extends UCInput | undefined = undefined, D extends UCData | null = null>(record: UCDataStoreRecord<I, D>, opts?: UCDataStoreWriteOpts): Promise<void>;
    writeBulk<I extends UCInput | undefined = undefined, D extends UCData | null = null>(records: UCDataStoreRecord<I, D>[], opts?: UCDataStoreWriteOpts): Promise<void>;
    writeProjection<T extends object>(name: string, data: T, opts?: UCDataStoreWriteProjectionOpts): Promise<void>;
}
export {};
