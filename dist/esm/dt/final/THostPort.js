import { TUInt } from '../base/TUInt.js';
export class THostPort extends TUInt {
    constructor(constraints) {
        super({
            ...constraints,
            min: 0,
        });
    }
    tName() {
        return 'HostPort';
    }
    example() {
        return 443;
    }
    fmt(ifNullOrUndefined) {
        if (typeof this.raw !== 'number') {
            return super.fmt(ifNullOrUndefined);
        }
        // Not using `fmtNumber` to avoid weird formatting (e.g. comma used as a thousands separator)
        return this.raw.toString();
    }
}
