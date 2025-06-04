import type { UCData } from '../data.js';
import type { UCDataStoreRecord } from '../data-store.js';
import type { UCInput } from '../input.js';
import type { UCName } from '../metadata.js';
/**
 * Check whether a data store records corresponds to the passed type
 *
 * Useful when fetching multiple records at once and looping over them to build an aggregate
 *
 * @param rec
 * @param name
 * @returns
 */
export declare const recIs: <I extends UCInput | undefined = undefined, D extends UCData | null = null>(rec: UCDataStoreRecord<any, any>, name: UCName) => rec is UCDataStoreRecord<I, D>;
