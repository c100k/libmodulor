import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type Username = string;
export declare class TUsername extends TString<Username> {
    tName(): TName;
    example(): Username;
}
