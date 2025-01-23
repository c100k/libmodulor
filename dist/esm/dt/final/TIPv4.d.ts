import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
export type IPv4 = `${number}.${number}.${number}.${number}`;
export declare class TIPv4 extends TString<IPv4> {
    static readonly FORMAT: RegExp;
    constructor(constraints?: TStringConstraints);
    tName(): TName;
    example(): IPv4;
}
