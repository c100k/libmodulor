import { fmtNumber } from '../../utils/index.js';
import { TBase } from './TBase.js';
export class TNumber extends TBase {
    constraints;
    decimalsCount;
    unit;
    step;
    static DEFAULT_MAX = Number.MAX_VALUE;
    static DEFAULT_MIN = -Number.MAX_VALUE;
    constructor(constraints, decimalsCount, unit, step) {
        super();
        this.constraints = constraints;
        this.decimalsCount = decimalsCount;
        this.unit = unit;
        this.step = step;
    }
    tName() {
        return 'Number';
    }
    assign(raw) {
        // It's not a string at all
        if (typeof raw !== 'string') {
            super.assign(raw);
            return this;
        }
        // It's a string, let's try to parse it
        const parsed = Number.parseFloat(raw);
        super.assign(parsed);
        return this;
    }
    example() {
        return 1.0;
    }
    fmt(ifNullOrUndefined) {
        if (typeof this.raw !== 'number') {
            return super.fmt(ifNullOrUndefined);
        }
        return fmtNumber(this.raw, this.unit, this.decimalsCount);
    }
    getConstraints() {
        return this.constraints;
    }
    getDecimalsCount() {
        return this.decimalsCount;
    }
    getStep() {
        return this.step;
    }
    htmlInputType() {
        return 'number';
    }
    max() {
        return this.constraints?.max ?? TNumber.DEFAULT_MAX;
    }
    min() {
        return this.constraints?.min ?? TNumber.DEFAULT_MIN;
    }
    rnInputMode() {
        return 'decimal';
    }
    validate() {
        const validation = super.validate();
        if (!validation.isOK()) {
            return validation;
        }
        if (typeof this.raw !== 'number' || Number.isNaN(this.raw)) {
            validation.add({
                constraint: 'type',
                expected: 'number',
            });
        }
        else {
            if (this.raw < this.min()) {
                validation.add({
                    constraint: 'min',
                    expected: this.min(),
                });
            }
            if (this.raw > this.max()) {
                validation.add({
                    constraint: 'max',
                    expected: this.max(),
                });
            }
        }
        return validation;
    }
}
