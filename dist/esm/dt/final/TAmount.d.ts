import type { TName } from '../base/TBase.js';
import { TNumber, type TNumberConstraints } from '../base/TNumber.js';
import type { CurrencyISO4217 } from './TCurrencyISO4217.js';
import type { UIntQuantity } from './TUIntQuantity.js';
export type Amount = number;
export declare class TAmount extends TNumber {
    protected currencyCode: CurrencyISO4217;
    constructor(currencyCode: CurrencyISO4217, constraints?: TNumberConstraints<number>, decimalsCount?: UIntQuantity);
    tName(): TName;
    example(): Amount;
    fmt(ifNullOrUndefined?: string | undefined): string;
    getCurrencyCode(): CurrencyISO4217;
}
