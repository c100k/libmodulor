import { TBase } from './TBase.js';
export class TString extends TBase {
    constraints;
    static DEFAULT_MAX_LENGTH = 999_999; // This is totally arbitrary and will probably be changed
    static DEFAULT_MIN_LENGTH = 0;
    constructor(constraints) {
        super();
        this.constraints = constraints;
    }
    tName() {
        return 'String';
    }
    example() {
        return 'Miami';
    }
    getConstraints() {
        return this.constraints;
    }
    isPotentiallyLong() {
        return false;
    }
    removeFormatConstraint() {
        if (!this.constraints?.format) {
            return;
        }
        this.constraints.format = undefined;
    }
    validate() {
        const validation = super.validate();
        if (!validation.isOK()) {
            return validation;
        }
        if (typeof this.raw !== 'string') {
            validation.add({
                constraint: 'type',
                expected: 'string',
            });
        }
        else {
            const length = this.raw.length;
            const minLength = this.constraints?.minLength ?? TString.DEFAULT_MIN_LENGTH;
            if (length < minLength) {
                validation.add({
                    constraint: 'minLength',
                    expected: minLength,
                });
            }
            const maxLength = this.constraints?.maxLength ?? TString.DEFAULT_MAX_LENGTH;
            if (length > maxLength) {
                validation.add({
                    constraint: 'maxLength',
                    expected: maxLength,
                });
            }
            const format = this.constraints?.format;
            if (format && !format.regexp.test(this.raw)) {
                validation.add({
                    constraint: 'format',
                    expected: format.f,
                });
            }
        }
        return validation;
    }
}
