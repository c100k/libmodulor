import type { Worker } from '../../std/index.js';
import type { UCData } from '../data.js';
import type { UCDataStoreRecord } from '../data-store.js';
import type { UCInput } from '../input.js';
import type { UC } from '../UC.js';
type OwnershipScope = 'organization' | 'user';
interface Input<I extends UCInput | undefined = undefined, D extends UCData | null = null> {
    record: UCDataStoreRecord<I, D>;
    scope?: OwnershipScope[];
    uc: UC<any, any, any>;
}
export declare class SimpleAggregateOwnershipChecker implements Worker<Input, Promise<void>> {
    exec<I extends UCInput | undefined = undefined, D extends UCData | null = null>({ record, scope, uc, }: Input<I, D>): Promise<void>;
    private checkOrg;
    private checkUser;
}
export {};
