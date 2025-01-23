import { TString } from '../base/TString.js';
export class TJSONString extends TString {
    tName() {
        return 'JSONString';
    }
    example() {
        return '{"key": "value"}';
    }
    isPotentiallyLong() {
        return true;
    }
    validate() {
        const validation = super.validate();
        try {
            JSON.parse(this.raw);
        }
        catch (err) {
            validation.add({
                constraint: 'format',
                expected: 'JSON',
            });
        }
        return validation;
    }
}
