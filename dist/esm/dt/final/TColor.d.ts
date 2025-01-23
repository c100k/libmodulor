import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
import type { HTMLInputType } from '../targets/web.js';
export type Color = string;
export declare class TColor extends TString<Color> {
    tName(): TName;
    example(): Color;
    htmlInputType(): HTMLInputType;
}
