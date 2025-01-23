import type { TName } from '../base/TBase.js';
import { TNumber, type TNumberConstraints } from '../base/TNumber.js';
import type { UIntQuantity } from './TUIntQuantity.js';
export type Percentage = number;
export declare class TPercentage extends TNumber {
    constructor(constraints?: TNumberConstraints<number>, decimalsCount?: UIntQuantity);
    tName(): TName;
    example(): Percentage;
    fmt(ifNullOrUndefined?: string | undefined): string;
}
