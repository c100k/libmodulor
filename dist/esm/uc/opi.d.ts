import type { DataType, UUID } from '../dt/index.js';
import type { Value } from './value.js';
export interface UCOPIBase {
    id: UUID;
}
export type UCOPIValue<T extends DataType> = Exclude<Value<T>, undefined>;
