import { TInt } from './TInt.js';
export class TUInt extends TInt {
    constructor(constraints, unit, step) {
        super(constraints, unit, step);
        if (constraints?.min !== undefined && constraints.min < 0) {
            throw new Error('The constraints of TUInt must be of type UInt. Got min < 0');
        }
    }
    tName() {
        return 'UInt';
    }
    example() {
        return 1;
    }
    min() {
        return this.constraints?.min ?? 0;
    }
}
