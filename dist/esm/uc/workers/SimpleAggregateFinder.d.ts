import type { UUID } from '../../dt/index.js';
import type { Worker } from '../../std/index.js';
import type { UCDataStore, UCDataStoreRecord } from '../data-store.js';
import type { UCData } from '../data.js';
import type { UCInput } from '../input.js';
import type { UCMetadata } from '../metadata.js';
interface Input {
    add: UCMetadata;
    aggregateId: UUID;
    remove: UCMetadata[];
}
interface Output<I extends UCInput | undefined = undefined, D extends UCData | null = null> {
    record: UCDataStoreRecord<I, D>;
}
export declare class SimpleAggregateFinder implements Worker<Input, Promise<Output>> {
    private ucDataStore;
    constructor(ucDataStore: UCDataStore);
    exec<I extends UCInput | undefined = undefined, D extends UCData | null = null>({ add, aggregateId, remove }: Input): Promise<Output<I, D>>;
}
export {};
