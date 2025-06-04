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
        if (!validation.isOK()) {
            return validation;
        }
        try {
            const parts = this.raw.split('.');
            if (parts.length !== 3) {
                validation.add({
                    constraint: 'format',
                    expected: 'JWT',
                });
            }
            const [header, payload, _signature] = parts;
            // Using atob on Node.js platforms triggers the following deprecation message :
            //
            // This function is only provided for compatibility with legacy web platform APIs and should never be used in new code,
            // because they use strings to represent binary data and predate the introduction of typed arrays in JavaScript.
            // For code running using Node.js APIs, converting between base64-encoded strings and binary data should be performed using Buffer.from(str, 'base64') andbuf.toString('base64').
            //
            // However this code must be executable everywhere (including and especially browsers) so we need to use it, for portability reasons
            if (header) {
                JSON.parse(atob(header));
            }
            if (payload) {
                JSON.parse(atob(payload));
            }
            // signature is ignored for now
        }
        catch (_err) {
            validation.add({
                constraint: 'format',
                expected: 'JWT',
            });
        }
        return validation;
    }
}
