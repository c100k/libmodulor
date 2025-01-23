import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type ErrorMessage = string;
export declare class TErrorMessage extends TString<ErrorMessage> {
    tName(): TName;
    example(): ErrorMessage;
}
