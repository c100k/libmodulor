import type { HTTPReqData } from './types.js';
export declare function fromQueryParams(url: URL): Promise<HTTPReqData>;
export declare function toQueryParams<T extends HTTPReqData>(data: T | undefined | null, url: URL): Promise<void>;
