import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
export type UUID = `${string}-${string}-${string}-${string}-${string}`;
export declare class TUUID extends TString<UUID> {
    static readonly FORMAT: RegExp;
    constructor(constraints?: TStringConstraints);
    tName(): TName;
    example(): UUID;
}
