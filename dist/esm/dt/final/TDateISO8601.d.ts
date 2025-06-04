import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
import type { HTMLInputType } from '../targets/web.js';
import type { Validation } from '../Validation.js';
export type DateISO8601 = string;
export declare class TDateISO8601 extends TString<DateISO8601> {
    tName(): TName;
    example(): DateISO8601;
    fmt(ifNullOrUndefined?: string | undefined): string;
    htmlInputType(): HTMLInputType;
    validate(): Validation;
}
