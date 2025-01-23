var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from 'inversify';
let NodeBufferManager = class NodeBufferManager {
    decodeBase64(value) {
        return Buffer.from(value, 'base64').toString('ascii');
    }
    decodeUint8Array(value) {
        return Buffer.from(value).toString('hex');
    }
    encodeBase64(value) {
        return Buffer.from(value).toString('base64');
    }
    encodeUint8Array(value) {
        return Uint8Array.from(Buffer.from(value, 'hex'));
    }
    from(value) {
        return Buffer.from(value);
    }
    fromHexToBase64(value) {
        return Buffer.from(value, 'hex').toString('base64');
    }
};
NodeBufferManager = __decorate([
    injectable()
], NodeBufferManager);
export { NodeBufferManager };
