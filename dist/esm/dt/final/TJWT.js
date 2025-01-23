import { TString } from '../base/TString.js';
export class TJWT extends TString {
    tName() {
        return 'JWT';
    }
    example() {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    }
    htmlInputType() {
        return 'password';
    }
    isSensitive() {
        return true;
    }
    validate() {
        const validation = super.validate();
        try {
            const parts = this.raw.split('.');
            if (parts.length !== 3) {
                validation.add({
                    constraint: 'format',
                    expected: 'JWT',
                });
            }
            const [header, payload, _signature] = parts;
            if (header) {
                JSON.parse(atob(header));
            }
            if (payload) {
                JSON.parse(atob(payload));
            }
        }
        catch (err) {
            validation.add({
                constraint: 'format',
                expected: 'JWT',
            });
        }
        return validation;
    }
}
