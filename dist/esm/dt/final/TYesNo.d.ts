import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type YesNo = 'N' | 'Y';
export declare class TYesNo extends TString<YesNo> {
    static readonly OPTIONS: YesNo[];
    constructor();
    tName(): TName;
    example(): YesNo;
}
