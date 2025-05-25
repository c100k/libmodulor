import { TBase } from './TBase.js';
export class TBoolean extends TBase {
    tName() {
        return 'Boolean';
    }
    assign(raw) {
        // It's not a string at all
        if (typeof raw !== 'string') {
            super.assign(raw);
            return this;
        }
        // It's a string, let's try to parse it
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
    fmt(ifNullOrUndefined) {
        if (typeof this.raw !== 'boolean') {
            return super.fmt(ifNullOrUndefined);
        }
        if (this.raw === true) {
            return 'Y';
        }
        return 'N';
    }
    htmlInputType() {
        return 'checkbox';
    }
    validate() {
        const validation = super.validate();
        if (!validation.isOK()) {
            return validation;
        }
        if (typeof this.raw !== 'boolean') {
            validation.add({
                constraint: 'type',
                expected: 'boolean',
            });
        }
        return validation;
    }
}
