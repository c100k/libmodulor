import type { DataType, JSONSchemaObject, JSONSchemaProperty } from '../../../dt/index.js';
import { type UC, type UCInput, type UCInputField, type UCInputUnwrapped, type UCOPIBase } from '../../../uc/index.js';
export interface UCInputFieldJsonSchemaDef<T extends DataType> {
    /**
     * Internal types that are not part of the spec
     */
    internal?: {
        required?: boolean;
    };
    /**
     * Fields that are part of the spec
     */
    spec?: JSONSchemaProperty<T>;
}
export declare function ucifJsonSchemaDef<T extends DataType>(field: UCInputField<T>): UCInputFieldJsonSchemaDef<T>;
export declare function ucInputJsonSchema<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>): JSONSchemaObject<UCInputUnwrapped<I>>;
