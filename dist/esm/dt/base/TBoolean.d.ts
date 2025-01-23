import type { Validation } from '../Validation.js';
import type { HTMLInputType } from '../targets/web.js';
import { TBase, type TName } from './TBase.js';
export declare class TBoolean extends TBase<boolean> {
    tName(): TName;
    assign(raw: unknown): this;
    example(): boolean;
    htmlInputType(): HTMLInputType;
    validate(): Validation;
}
