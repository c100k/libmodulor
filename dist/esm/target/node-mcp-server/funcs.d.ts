import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { type DataType } from '../../dt/index.js';
import { type UCInputFieldDef } from '../../uc/index.js';
import type { PropertyType } from './types.js';
export declare function propertyType<T extends DataType>(def: UCInputFieldDef<T>): PropertyType;
export declare function resError(err: Error): CallToolResult;
export declare function resObj<T>(obj: T): CallToolResult;
