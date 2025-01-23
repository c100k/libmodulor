import type { Validation } from '../Validation.js';
import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type JSONString = string;
export declare class TJSONString extends TString<JSONString> {
    tName(): TName;
    example(): JSONString;
    isPotentiallyLong(): boolean;
    validate(): Validation;
}
