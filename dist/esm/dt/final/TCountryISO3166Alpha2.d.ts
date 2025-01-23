import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type CountryISO3166Alpha2 = Uppercase<string>;
export type CountryName = Capitalize<string>;
export declare class TCountryISO3166Alpha2 extends TString<CountryISO3166Alpha2> {
    static readonly OPTIONS: [CountryName, CountryISO3166Alpha2][];
    constructor();
    tName(): TName;
    example(): CountryISO3166Alpha2;
}
