import type { DataType, JSONSchemaObject, JSONSchemaProperty } from '../../../dt/index.js';
import { type UC, type UCInput, type UCOPIBase, type UCOutput, type UCOutputField, type UCOutputPart, type UCOutputReaderPart } from '../../../uc/index.js';
export interface UCOutputFieldJsonSchemaDef<T extends DataType> {
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
export declare function ucofJsonSchemaDef<OPI extends UCOPIBase, T extends DataType>(field: UCOutputField<OPI, T>): UCOutputFieldJsonSchemaDef<T>;
export declare function ucOPIJsonSchema<OPI extends UCOPIBase>(part: UCOutputReaderPart<NonNullable<OPI>>): JSONSchemaObject<OPI>;
export declare function ucOutputPartJsonSchema<OPI extends UCOPIBase>(part: UCOutputReaderPart<NonNullable<OPI>>): JSONSchemaObject<UCOutputPart<OPI>>;
export declare function ucOutputPartPaginationJsonSchema<OPI extends UCOPIBase>(): JSONSchemaObject<NonNullable<UCOutputPart<OPI>['pagination']>>;
export declare function ucOutputJsonSchema<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>): JSONSchemaObject<UCOutput<OPI0, OPI1>> | null;
