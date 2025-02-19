import { TString } from '../base/TString.js';
export class TCurrencyISO4217 extends TString {
    // From https://www.iban.com/currency-codes
    static OPTIONS = [
        ['Euro', 'EUR', '€'],
        ['Pound Sterling', 'GBP', '£'],
        ['US Dollar', 'USD', '$'],
    ];
    constructor() {
        super({
            maxLength: 3,
            minLength: 3,
        });
        this.setOptions(TCurrencyISO4217.OPTIONS.map(([name, code]) => ({
            label: name,
            value: code,
        })));
    }
    tName() {
        return 'CurrencyISO4217';
    }
    example() {
        return 'EUR';
    }
}
