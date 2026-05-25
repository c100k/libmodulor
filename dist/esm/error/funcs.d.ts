import type { ErrorMessage, HTTPStatusNumber } from '../dt/index.js';
import type { Class } from '../utils/index.js';
import type { CustomError } from './CustomError.js';
export declare const ERROR_HTTP_STATUS_MAP: Map<HTTPStatusNumber, Class<CustomError>>;
export declare function logDevWarning(message: ErrorMessage): void;
export declare function isEmptyJSON(err: unknown): boolean;
export declare function isInvalidJSON(err: unknown): boolean;
export declare function throwCustomError(message: ErrorMessage, status: HTTPStatusNumber): never;
