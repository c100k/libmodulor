export type JSONSchemaNumberFormat = 'double' | 'float' | 'int32' | 'int64';
export type JSONSchemaStringFormat = 'binary' | 'byte' | 'date' | 'date-time' | 'email' | 'hostname' | 'ipv4' | 'ipv6' | 'password' | 'time' | 'uuid' | 'uri';
export type JSONSchemaObjectProperties = Record<string, JSONSchemaType>;
export type JSONSchemaType = {
    type: 'array';
    items: JSONSchemaType;
    maxItems?: number | undefined;
    minItems?: number | undefined;
    uniqueItems?: boolean | undefined;
} | {
    type: 'boolean';
} | {
    type: 'integer';
} | {
    type: 'number';
    format?: JSONSchemaNumberFormat;
} | {
    type: 'object';
    properties?: JSONSchemaObjectProperties;
    required?: string[];
} | {
    type: 'string';
    format?: JSONSchemaStringFormat;
};
