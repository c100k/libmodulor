import type { ErrorMessage, HTTPStatusNumber } from '../dt/index.js';
export declare function isEmptyJSON(err: unknown): boolean;
export declare function isInvalidJSON(err: unknown): boolean;
export declare function throwCustomError(message: ErrorMessage, status: HTTPStatusNumber): never;
