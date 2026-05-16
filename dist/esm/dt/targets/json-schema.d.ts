import type { StringKeys } from '../../utils/index.js';
import type { DataType } from '../DataType.js';
export type JSONSchemaNumberFormat = 'double' | 'float' | 'int32' | 'int64';
export type JSONSchemaStringFormat = 'binary' | 'byte' | 'date' | 'date-time' | 'email' | 'hostname' | 'ipv4' | 'ipv6' | 'password' | 'time' | 'uuid' | 'uri';
export type JSONSchemaType = {
    type: 'array' | ['array', 'null'];
    items: JSONSchemaType;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
} | {
    type: 'boolean' | ['boolean', 'null'];
} | {
    type: 'integer' | ['integer', 'null'];
} | {
    type: 'number' | ['number', 'null'];
    format?: JSONSchemaNumberFormat;
} | {
    additionalProperties: false;
    properties: Record<string, JSONSchemaType>;
    required?: string[];
    type: 'object' | ['object', 'null'];
} | {
    type: 'string' | ['string', 'null'];
    format?: JSONSchemaStringFormat;
};
export type JSONSchemaProperty<T extends DataType> = JSONSchemaType & {
    enum?: (T | null)[];
    examples?: T[];
};
export interface JSONSchemaObject<T extends object> {
    additionalProperties: false;
    properties: Record<StringKeys<T>, JSONSchemaProperty<any>>;
    required?: StringKeys<T>[];
    type: 'object' | ['object', 'null'];
}
