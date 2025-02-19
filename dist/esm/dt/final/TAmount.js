import { TNumber } from '../base/TNumber.js';
// NOTE : We accept negative values (used for example in accounting)
export class TAmount extends TNumber {
    currencyCode;
    constructor(currencyCode, constraints, decimalsCount) {
        super(constraints, decimalsCount);
        this.currencyCode = currencyCode;
    }
    tName() {
        return 'Amount';
    }
    example() {
        return 999.99;
    }
    fmt(ifNullOrUndefined) {
        if (typeof this.raw !== 'number') {
            return super.fmt(ifNullOrUndefined);
        }
        return new Intl.NumberFormat(undefined, {
            currency: this.currencyCode,
            maximumFractionDigits: this.getDecimalsCount(),
            style: 'currency',
        }).format(this.raw);
    }
    getCurrencyCode() {
        return this.currencyCode;
    }
}
