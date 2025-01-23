var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { createHash } from 'node:crypto';
import { injectable } from 'inversify';
import { NodeCryptoManager } from './NodeCryptoManager.js';
let NodeDeterministicCryptoManager = class NodeDeterministicCryptoManager extends NodeCryptoManager {
    randomStringIdx = 0;
    uuidIdx = 0;
    async clear() {
        await super.clear();
        this.randomStringIdx = 0;
        this.uuidIdx = 0;
    }
    async randomString(length) {
        this.randomStringIdx += 1;
        let res = '';
        while (res.length < length) {
            const hash = this.hash('sha512', this.randomStringIdx.toString(), 'hex');
            res = `${res}${hash}`;
        }
        if (res.length > length) {
            res = res.substring(0, length + 1);
        }
        return res;
    }
    randomUUID() {
        this.uuidIdx += 1;
        const hash = createHash('sha1').update(this.uuidIdx.toString());
        const hashBytes = hash.digest().subarray(0, 16);
        const bytes = Array.from(hashBytes);
        if (bytes[6] !== undefined) {
            bytes[6] = (bytes[6] & 0x0f) | 0x40;
        }
        if (bytes[8] !== undefined) {
            bytes[8] = (bytes[8] & 0x3f) | 0x80;
        }
        const raw = bytes
            .map((byte) => {
            return (byte + 0x1_00).toString(16).substring(1);
        })
            .join('');
        const uuid = [
            raw.substring(0, 8),
            raw.substring(8, 12),
            raw.substring(12, 16),
            raw.substring(16, 20),
            raw.substring(20, 32),
        ].join('-');
        return uuid;
    }
};
NodeDeterministicCryptoManager = __decorate([
    injectable()
], NodeDeterministicCryptoManager);
export { NodeDeterministicCryptoManager };
