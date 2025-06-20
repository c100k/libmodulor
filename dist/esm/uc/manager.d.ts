import type { UUID } from '../dt/index.js';
import type { UCData } from './data.js';
import type { UCDataStoreRecord } from './data-store.js';
import type { UCExecMode } from './exec.js';
import type { UCOutputReader } from './helpers/UCOutputReader.js';
import type { UCInput } from './input.js';
import type { UCOPIBase } from './opi.js';
import type { UCOutputOrNothing } from './output.js';
import type { UC } from './UC.js';
export interface UCManagerPersistOpts {
    /**
     * In case the use case relates to an existing aggregate, pass its `aggregateId` in this field.
     * This is typically used in a `Delete` use case in order to link it to the `Create` one executed in the past.
     */
    aggregateId?: UUID;
    /**
     * @defaultValue {@link UCExecMode.USER}
     */
    executionMode?: UCExecMode;
    /**
     * In case the use case is performed by an anonymous user or a user outside the organization, pass the actual `organizationId` in this field.
     * This is typically used in a use case where someone anonymous posts something for a specific organization in a multi-tenant architecture.
     */
    organizationId?: UUID;
}
export interface UCManager {
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
