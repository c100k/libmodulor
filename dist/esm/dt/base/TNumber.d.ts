import { type Unit } from '../../utils/index.js';
import type { UIntQuantity } from '../final/TUIntQuantity.js';
import type { RNInputMode } from '../targets/rn.js';
import type { HTMLInputType } from '../targets/web.js';
import type { Validation } from '../Validation.js';
import { TBase, type TName } from './TBase.js';
export interface TNumberConstraints<T extends number> {
    max?: T;
    min?: T;
}
export declare class TNumber<T extends number = number> extends TBase<T> {
    protected constraints?: TNumberConstraints<number> | undefined;
    protected decimalsCount?: UIntQuantity | undefined;
    protected unit?: Unit | undefined;
    protected step?: T | undefined;
    static readonly DEFAULT_MAX: number;
    static readonly DEFAULT_MIN: number;
    constructor(constraints?: TNumberConstraints<number> | undefined, decimalsCount?: UIntQuantity | undefined, unit?: Unit | undefined, step?: T | undefined);
    tName(): TName;
    assign(raw: unknown): this;
    example(): T;
    fmt(ifNullOrUndefined?: string | undefined): string;
    getConstraints(): TNumberConstraints<number> | undefined;
    getDecimalsCount(): UIntQuantity | undefined;
    getStep(): T | undefined;
    htmlInputType(): HTMLInputType;
    max(): NonNullable<TNumberConstraints<number>['max']>;
    min(): NonNullable<TNumberConstraints<number>['min']>;
    rnInputMode(): RNInputMode;
    validate(): Validation;
}
