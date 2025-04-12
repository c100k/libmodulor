import type { JSONString } from '../../dt/index.js';
import type { HTTPReqData } from './types.js';
export declare function toJSON<T extends HTTPReqData>(data: T | undefined | null): JSONString;
