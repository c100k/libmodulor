import type { UUID } from '../dt/index.js';
import type { UC } from './UC.js';
import type { UCDataStoreRecord } from './data-store.js';
import type { UCData } from './data.js';
import type { UCExecMode } from './exec.js';
import type { UCOutputReader } from './helpers/UCOutputReader.js';
import type { UCInput } from './input.js';
import type { UCOPIBase } from './opi.js';
import type { UCOutputOrNothing } from './output.js';
export interface UCManagerPersistOpts {
    aggregateId?: UUID;
    executionMode?: UCExecMode;
    organizationId?: UUID;
}
export interface UCManager {
    commitTx(): Promise<void>;
    confirmClient<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>): Promise<boolean>;
    execClient<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>): Promise<UCOutputReader<I, OPI0, OPI1>>;
    execServer<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>): Promise<UCOutputOrNothing<OPI0, OPI1>>;
    initServer<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>): Promise<void>;
    initTx(): Promise<void>;
    persist<I extends UCInput | undefined = undefined, D extends UCData | null = null, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>, data?: D, opts?: UCManagerPersistOpts): Promise<UCDataStoreRecord<I, D>>;
    persistProjection<T extends object>(name: string, data: T): Promise<void>;
    rollbackTx(): Promise<void>;
}
