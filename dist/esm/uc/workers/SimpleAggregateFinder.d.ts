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
/**
 * Find an aggregate by id by replaying additive use cases and removal ones
 *
 * This works only in simple scenarios where you have the following use cases :
 *   - `CreateX`
 *   - `CreateX`, `DeleteX`
 *   - `CreateX`, `[DeleteX, ArchiveX]`
 *
 * If there is an `UpdateX` for example, do not use this as the record won't be accurate. Replay the records yourself with {@link UCDataStore.read()}.
 *
 * It throws a {@link NotFoundError} if there are more than one record (in which case somethin is wrong with the data store) or none.
 */
export declare class SimpleAggregateFinder implements Worker<Input, Promise<Output>> {
    private ucDataStore;
    constructor(ucDataStore: UCDataStore);
    exec<I extends UCInput | undefined = undefined, D extends UCData | null = null>({ add, aggregateId, remove }: Input): Promise<Output<I, D>>;
}
export {};
