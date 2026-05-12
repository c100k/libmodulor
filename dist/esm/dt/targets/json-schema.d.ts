export type JSONSchemaNumberFormat = 'double' | 'float' | 'int32' | 'int64';
export type JSONSchemaStringFormat = 'binary' | 'byte' | 'date' | 'date-time' | 'email' | 'hostname' | 'ipv4' | 'ipv6' | 'password' | 'time' | 'uuid' | 'uri';
export type JSONSchemaObjectProperties = Record<string, JSONSchemaType>;
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
    type: 'object' | ['object', 'null'];
    properties?: JSONSchemaObjectProperties;
    required?: string[];
} | {
    type: 'string' | ['string', 'null'];
    format?: JSONSchemaStringFormat;
};
