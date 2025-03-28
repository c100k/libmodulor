import { TUInt } from '../base/TUInt.js';
export class TTimestamp extends TUInt {
    tName() {
        return 'Timestamp';
    }
    example() {
        return 1_628_359_209;
    }
    fmt(ifNullOrUndefined) {
        if (typeof this.raw !== 'number') {
            return super.fmt(ifNullOrUndefined);
        }
        // Not using `fmtNumber` to avoid weird formatting (e.g. comma used as a thousands separator)
        return this.raw.toString();
    }
}
