import type { ErrorMessage, HTTPStatusNumber } from '../../dt/index.js';
export declare const SSE_HEADERS: [string, string][];
export declare const SSE_DATA_PREFIX = "data:";
export declare const SSE_DATA_SEP = "\n";
export declare const SSE_MSG_SEP = "\n\n";
export type SSEStreamDataCleanUpFunc = () => void;
export interface SSEError {
    message: ErrorMessage;
    status: HTTPStatusNumber;
}
export declare function fmtSSEError(err: SSEError): string;
export declare function fmtSingleDataMsg<D extends object = object>(data: D): string;
export declare function isSSEError(err: unknown): err is SSEError;
export declare function parseDataLine(line: string): string;
