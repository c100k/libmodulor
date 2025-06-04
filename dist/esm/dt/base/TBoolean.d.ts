import type { HTMLInputType } from '../targets/web.js';
import type { Validation } from '../Validation.js';
import { TBase, type TName } from './TBase.js';
export declare class TBoolean extends TBase<boolean> {
    tName(): TName;
    assign(raw: unknown): this;
    example(): boolean;
    fmt(ifNullOrUndefined?: string | undefined): string;
    htmlInputType(): HTMLInputType;
    validate(): Validation;
}
