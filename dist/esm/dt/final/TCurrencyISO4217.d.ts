import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type CurrencyISO4217 = 'EUR' | 'GBP' | 'USD';
export type CurrencyName = Capitalize<string>;
export type CurrencySign = Capitalize<string>;
export declare class TCurrencyISO4217 extends TString<CurrencyISO4217> {
    static readonly OPTIONS: [
        CurrencyName,
        CurrencyISO4217,
        CurrencySign
    ][];
    constructor();
    tName(): TName;
    example(): CurrencyISO4217;
}
