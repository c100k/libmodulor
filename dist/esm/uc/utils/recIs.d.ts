import type { UCDataStoreRecord } from '../data-store.js';
import type { UCData } from '../data.js';
import type { UCInput } from '../input.js';
import type { UCName } from '../metadata.js';
export declare const recIs: <I extends UCInput | undefined = undefined, D extends UCData | null = null>(rec: UCDataStoreRecord<any, any>, name: UCName) => rec is UCDataStoreRecord<I, D>;
