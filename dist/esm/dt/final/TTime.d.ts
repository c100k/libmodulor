import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
import type { RNInputMode } from '../targets/rn.js';
import type { HTMLInputType } from '../targets/web.js';
export type Time = `${number}${number}:${number}${number}` | `${number}${number}:${number}${number}:${number}${number}`;
export declare class TTime extends TString<Time> {
    static readonly FORMAT: RegExp;
    constructor(constraints?: TStringConstraints);
    tName(): TName;
    example(): Time;
    htmlInputType(): HTMLInputType;
    rnInputMode(): RNInputMode;
}
