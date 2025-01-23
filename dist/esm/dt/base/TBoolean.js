import { TBase } from './TBase.js';
export class TBoolean extends TBase {
    tName() {
        return 'Boolean';
    }
    assign(raw) {
        if (typeof raw !== 'string') {
            super.assign(raw);
            return this;
        }
        if (raw === 'true') {
            super.assign(true);
            return this;
        }
        if (raw === 'false') {
            super.assign(false);
            return this;
        }
        super.assign(raw);
        return this;
    }
    example() {
        return true;
    }
    htmlInputType() {
        return 'checkbox';
    }
    validate() {
        const validation = super.validate();
        if (typeof this.raw !== 'boolean') {
            validation.add({
                constraint: 'type',
                expected: 'boolean',
            });
        }
        return validation;
    }
}
