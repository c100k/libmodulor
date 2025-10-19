import type { HTTPStatusNumber } from '../../dt/index.js';
export declare function isError(status: HTTPStatusNumber): boolean;
export declare function isClientError(status: HTTPStatusNumber): boolean;
export declare function isServerError(status: HTTPStatusNumber): boolean;
