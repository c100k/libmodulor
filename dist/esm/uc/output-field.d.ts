import type { DataType, TBase, UIntQuantity } from '../dt/index.js';
import type { StringKeys } from '../utils/index.js';
import { type UCFieldDefCardinality } from './cardinality.js';
import type { UCOPIBase } from './opi.js';
/**
 * Definition of a use case output field
 */
export interface UCOutputFieldDef<OPI extends UCOPIBase, T extends DataType> {
    /**
     * A field can have 0, 1 or n values. This field defines the rules.
     *
     * @defaultValue { max: 1, min: 1 } => it has a single value
     *
     * @example { max: 5, min: 0 } => it has at most 5 values or none
     * @example { min: 0 } => it is nullable
     */
    cardinality?: UCFieldDefCardinality;
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
export declare function ucofExamples<OPI extends UCOPIBase, T extends DataType>(def: UCOutputFieldDef<OPI, T>): T[] | undefined;
export declare function ucofIsMandatory<OPI extends UCOPIBase, T extends DataType>(def: UCOutputFieldDef<OPI, T>): boolean;
export declare function ucofRepeatability<OPI extends UCOPIBase, T extends DataType>(def: UCOutputFieldDef<OPI, T>): [boolean, UIntQuantity];
