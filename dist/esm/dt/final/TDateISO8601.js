import { TString } from '../base/TString.js';
export class TDateISO8601 extends TString {
    tName() {
        return 'DateISO8601';
    }
    example() {
        return '2022-07-14';
    }
    fmt(ifNullOrUndefined) {
        if (typeof this.raw !== 'string') {
            return super.fmt(ifNullOrUndefined);
        }
        return new Intl.DateTimeFormat(undefined).format(new Date(this.raw));
    }
    htmlInputType() {
        return 'date';
    }
    validate() {
        const validation = super.validate();
        const parsed = Date.parse(this.raw);
        if (Number.isNaN(parsed)) {
            validation.add({
                constraint: 'format',
                expected: 'DateISO8601',
            });
        }
        return validation;
    }
}
