import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
import type { HTMLInputType } from '../targets/web.js';
export type ColorRGBA = string;
export declare class TColorRGBA extends TString<ColorRGBA> {
    static readonly FORMAT: RegExp;
    constructor(constraints?: TStringConstraints);
    tName(): TName;
    example(): ColorRGBA;
    htmlInputType(): HTMLInputType;
}
