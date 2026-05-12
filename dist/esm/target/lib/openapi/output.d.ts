import type { DataType } from '../../../dt/index.js';
import { type UCOPIBase, type UCOutputField } from '../../../uc/index.js';
import type { OpenAPIProperty } from './types.js';
export interface OpenAPIOutputDef<T extends DataType> {
    /**
     * Internal types that are not part of the spec
     */
    internal?: {
        required?: boolean;
    };
    /**
     * Fields that are part of the spec
     */
    spec?: OpenAPIProperty<T>;
}
export declare function openAPIOutputDef<OPI extends UCOPIBase, T extends DataType>(field: UCOutputField<OPI, T>): OpenAPIOutputDef<T>;
