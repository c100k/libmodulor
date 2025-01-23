import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type FileName = string;
export declare class TFileName extends TString<FileName> {
    tName(): TName;
    example(): FileName;
}
