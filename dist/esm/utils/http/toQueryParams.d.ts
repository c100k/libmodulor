import type { HTTPReqData } from './types.js';
export declare function toQueryParams<T extends HTTPReqData>(data: T | undefined | null, url: URL): Promise<void>;
