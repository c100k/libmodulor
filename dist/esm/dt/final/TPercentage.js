import { TNumber } from '../base/TNumber.js';
export class TPercentage extends TNumber {
    constructor(constraints, decimalsCount) {
        super(constraints, decimalsCount, 'percent');
    }
    tName() {
        return 'Percentage';
    }
    example() {
        return 0.26;
    }
    fmt(ifNullOrUndefined) {
        if (typeof this.raw !== 'number') {
            return super.fmt(ifNullOrUndefined);
        }
        return new Intl.NumberFormat(undefined, {
            maximumFractionDigits: this.decimalsCount,
            style: 'percent',
        }).format(this.raw);
    }
}
