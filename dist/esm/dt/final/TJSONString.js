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
        if (!validation.isOK()) {
            return validation;
        }
        try {
            JSON.parse(this.raw);
        }
        catch (_err) {
            validation.add({
                constraint: 'format',
                expected: 'JSON',
            });
        }
        return validation;
    }
}
