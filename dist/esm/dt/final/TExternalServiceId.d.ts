import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type ExternalServiceId = string;
export declare class TExternalServiceId extends TString<ExternalServiceId> {
    tName(): TName;
    example(): ExternalServiceId;
}
