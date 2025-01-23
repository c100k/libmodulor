import type { ListToolsResult } from '@modelcontextprotocol/sdk/types.js';
import type { UIntQuantity } from '../../dt/index.js';
export type PropertyPrimitiveType = 'boolean' | 'integer' | 'number' | 'object' | 'string';
export type PropertyArrayType<T extends PropertyPrimitiveType> = {
    items: {
        type: T;
    };
    maxItems?: UIntQuantity | undefined;
    minItems?: UIntQuantity | undefined;
    type: 'array';
};
export type PropertyType<T extends PropertyPrimitiveType = PropertyPrimitiveType> = {
    type: T;
} | PropertyArrayType<T>;
export type Property<T extends PropertyPrimitiveType = PropertyPrimitiveType> = PropertyType<T> & {
    description: string | null;
    required: boolean;
};
export type Tool = ListToolsResult['tools'][0];
