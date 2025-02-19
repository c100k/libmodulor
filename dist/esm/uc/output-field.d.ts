import type { DataType, TBase } from '../dt/index.js';
import type { StringKeys } from '../utils/index.js';
import type { UCOPIBase } from './opi.js';
/**
 * Definition of a use case output field
 */
export interface UCOutputFieldDef<OPI extends UCOPIBase, T extends DataType> {
    /**
     * Indicates another field of the output this field can potentially link to (in the `<a></a>` way).
     */
    linksTo?: StringKeys<OPI>;
    /**
     * The aggregation method to use to present the summary of this field across all the corresponding items.
     */
    totalType?: 'sum';
    type: TBase<T>;
}
