var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import crypto from 'node:crypto';
import { promisify } from 'node:util';
import { injectable } from 'inversify';
// https://nodejs.org/api/crypto.html#cryptopbkdf2password-salt-iterations-keylen-digest-callback
const pbkdf2 = promisify(crypto.pbkdf2);
// https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback
const scrypt = promisify(crypto.scrypt);
let NodeCryptoManager = class NodeCryptoManager {
    async clear() {
        // Nothing to do
    }
    hash(algorithm, base, binaryToTextEncoding) {
        return crypto
            .createHash(algorithm)
            .update(base)
            .digest(binaryToTextEncoding);
    }
    hmacToBase64(algorithm, base, key, keyEncoding) {
        return crypto
            .createHmac(algorithm, key, { encoding: keyEncoding })
            .update(base)
            .digest('base64');
    }
    hmacToHex(algorithm, base, key, keyEncoding) {
        return crypto
            .createHmac(algorithm, key, { encoding: keyEncoding })
            .update(base)
            .digest('hex');
    }
    async pbkdf2(password, salt, iterationsCount, keyLength, digest) {
        const result = await pbkdf2(password, salt, iterationsCount, keyLength, digest);
        return Uint8Array.from(result);
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
        return crypto.randomUUID();
    }
    async scrypt(password, salt, keyLength) {
        const buffer = (await scrypt(password, salt, keyLength)); // Forced to cast because it seems to be not typed correctly
        return buffer.toString('hex');
    }
};
NodeCryptoManager = __decorate([
    injectable()
], NodeCryptoManager);
export { NodeCryptoManager };
