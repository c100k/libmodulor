import { type DataType, type UUID } from '../dt/index.js';
import type { UCOutputPartDefFields } from './output-part.js';
import type { Value } from './value.js';
/**
 * Base interface all the use case OPI interfaces must extend
 */
export interface UCOPIBase {
    id: UUID;
}
export declare const UCOPIBaseDefFields: UCOutputPartDefFields<UCOPIBase>;
/**
 * A value returned as part of an OPI
 *
 * Unlike {@link UCInputFieldValue}, it cannot be `undefined` because it is not serializable in JSON.
 */
export type UCOPIValue<T extends DataType> = Exclude<Value<T>, undefined>;
