import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type SQLQuery = string;
export declare class TSQLQuery extends TString<SQLQuery> {
    tName(): TName;
    example(): SQLQuery;
    isPotentiallyLong(): boolean;
}
