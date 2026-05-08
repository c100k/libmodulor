import type { DataType } from '../../../dt/index.js';
import { type UCInputField } from '../../../uc/index.js';
import type { OpenAPIProperty } from './types.js';
export interface OpenAPIInputDef<T extends DataType> {
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
export declare function openAPIInputDef<T extends DataType>(field: UCInputField<T>): OpenAPIInputDef<T>;
