import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type ErrorCode = `err_${string}`;
export declare class TErrorCode extends TString<ErrorCode> {
    tName(): TName;
    example(): ErrorCode;
}
