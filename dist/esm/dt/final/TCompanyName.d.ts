import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type CompanyName = string;
export declare class TCompanyName extends TString<CompanyName> {
    tName(): TName;
    example(): CompanyName;
}
