import { TNumber } from './TNumber.js';
export class TInt extends TNumber {
    static DEFAULT_MAX = Number.MAX_SAFE_INTEGER;
    static DEFAULT_MIN = Number.MIN_SAFE_INTEGER;
    constructor(constraints, unit, step) {
        super(constraints, undefined, unit, step);
    }
    tName() {
        return 'Int';
    }
    assign(raw) {
        // It's not a string at all
        if (typeof raw !== 'string') {
            super.assign(raw);
            return this;
        }
        // It's a string, let's try to parse it
        const parsed = Number.parseInt(raw, 10);
        if (Number.isNaN(parsed)) {
            super.assign(raw);
            return this;
        }
        // It's been parsed correctly, let's make sure it's not a float that has been "truncated" into an int
        if (parsed.toString() !== raw) {
            super.assign(raw);
            return this;
        }
        super.assign(parsed);
        return this;
    }
    example() {
        return 1;
    }
    getConstraints() {
        return this.constraints;
    }
    max() {
        return this.constraints?.max ?? TInt.DEFAULT_MAX;
    }
    min() {
        return this.constraints?.min ?? TInt.DEFAULT_MIN;
    }
    rnInputMode() {
        return 'numeric';
    }
    validate() {
        const validation = super.validate();
        if (typeof this.raw === 'number' && this.raw.toString().includes('.')) {
            validation.add({
                constraint: 'type',
                expected: 'int',
            });
        }
        return validation;
    }
}
