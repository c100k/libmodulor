var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from 'inversify';
import { NotAvailableError, NotImplementedError } from '../../error/index.js';
const DIGEST_MAPPING = new Map([
    ['sha512', 'SHA-512'],
]);
let WebCryptoManager = class WebCryptoManager {
    async clear() {
        // Nothing to do
    }
    hash(_algorithm, _base) {
        throw new NotImplementedError('hash');
    }
    hmacToBase64(_algorithm, _base, _key, _keyEncoding) {
        throw new NotImplementedError('hmacToBase64');
    }
    hmacToHex(_algorithm, _base, _key, _keyEncoding) {
        throw new NotImplementedError('hmacToHex');
    }
    async pbkdf2(password, salt, iterationsCount, keyLength, digest) {
        const hash = DIGEST_MAPPING.get(digest);
        if (!hash) {
            throw new Error(`Digest ${digest} is not valid for WebCryptoManager`);
        }
        // "Secure context: This feature is available only in secure contexts (HTTPS), in some or all supporting browsers."
        // Warning: This API provides a number of low-level cryptographic primitives. It's very easy to misuse them, and the pitfalls involved can be very subtle.
        // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto
        const textEncoder = new TextEncoder();
        const passwordKey = await crypto.subtle.importKey('raw', textEncoder.encode(password), 'PBKDF2', false, ['deriveBits']);
        const result = await crypto.subtle.deriveBits({
            // https://developer.mozilla.org/en-US/docs/Web/API/Pbkdf2Params
            hash,
            iterations: iterationsCount,
            name: 'PBKDF2',
            salt: textEncoder.encode(salt),
        }, passwordKey, keyLength * 8);
        return new Uint8Array(result);
    }
    async randomString(length) {
        // Not perfect in terms of randomness (because of Math.random() but pretty fine for now)
        let res = '';
        while (res.length < length) {
            const next = Math.random().toString(36).slice(2, 3);
            // For now, we want only chars at the beginning, so it can be used as an identifier (i.e. in a database)
            if (res.length === 0 &&
                Number.isInteger(Number.parseInt(next, 10))) {
                continue;
            }
            res += next;
        }
        return res;
    }
    randomUUID() {
        // "Secure context: This feature is available only in secure contexts (HTTPS), in some or all supporting browsers."
        // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
        return crypto.randomUUID();
    }
    async scrypt() {
        throw new NotAvailableError('scrypt');
    }
};
WebCryptoManager = __decorate([
    injectable()
], WebCryptoManager);
export { WebCryptoManager };
