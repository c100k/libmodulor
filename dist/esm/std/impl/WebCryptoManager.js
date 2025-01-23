var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from 'inversify';
const DIGEST_MAPPING = new Map([
    ['sha512', 'SHA-512'],
]);
let WebCryptoManager = class WebCryptoManager {
    async clear() {
    }
    hash(_algorithm, _base) {
        throw new Error('Method not implemented.');
    }
    hmacToBase64(_algorithm, _base, _key, _keyEncoding) {
        throw new Error('Method not implemented.');
    }
    hmacToHex(_algorithm, _base, _key, _keyEncoding) {
        throw new Error('Method not implemented.');
    }
    async pbkdf2(password, salt, iterationsCount, keyLength, digest) {
        const hash = DIGEST_MAPPING.get(digest);
        if (!hash) {
            throw new Error(`Digest ${digest} is not valid for WebCryptoManager`);
        }
        const textEncoder = new TextEncoder();
        const passwordKey = await crypto.subtle.importKey('raw', textEncoder.encode(password), 'PBKDF2', false, ['deriveBits']);
        const result = await crypto.subtle.deriveBits({
            hash,
            iterations: iterationsCount,
            name: 'PBKDF2',
            salt: textEncoder.encode(salt),
        }, passwordKey, keyLength * 8);
        return new Uint8Array(result);
    }
    async randomString(length) {
        let res = '';
        while (res.length < length) {
            const next = Math.random().toString(36).slice(2, 3);
            if (res.length === 0 &&
                Number.isInteger(Number.parseInt(next, 10))) {
                continue;
            }
            res += next;
        }
        return res;
    }
    randomUUID() {
        return crypto.randomUUID();
    }
    async scrypt() {
        throw new Error('Not available on this platform');
    }
};
WebCryptoManager = __decorate([
    injectable()
], WebCryptoManager);
export { WebCryptoManager };
