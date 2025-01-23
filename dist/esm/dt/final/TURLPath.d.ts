import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type URLPath = string;
export declare class TURLPath extends TString<URLPath> {
    tName(): TName;
    example(): URLPath;
}
