import { TNumber } from '../base/TNumber.js';
// TODO : Add some constraints (e.g. between 0 and 1, etc.)
// Not forgetting that a percentage can be higher hein ! 1.25 is a valid value for 125% !
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
        // Although it works on web, using fmtNumber and setting the unit to 'percent' does not work on React Native (Hermes)
        // Instead of displaying '89%', it displays '89 percent'
        // Hence the usage here of style: 'percent' directly
        return new Intl.NumberFormat(undefined, {
            maximumFractionDigits: this.decimalsCount,
            style: 'percent',
        }).format(this.raw);
    }
}
