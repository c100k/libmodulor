var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from 'inversify';
import { osc7501_isBase64able, } from '../../../utils/index.js';
let OSC7501Reporter = class OSC7501Reporter {
    bufferManager;
    processOutputEmitter;
    productManifest;
    constructor(bufferManager, processOutputEmitter, productManifest) {
        this.bufferManager = bufferManager;
        this.processOutputEmitter = processOutputEmitter;
        this.productManifest = productManifest;
    }
    async exec(input) {
        const app = this.productManifest.name.toLocaleLowerCase();
        if (!input.app) {
            input.app = app;
        }
        const vars = this.buildVars(input)
            .map(([k, v]) => `${k}=${v}`)
            .join(':');
        await this.processOutputEmitter.emitRes(`\x1b]7501;${vars}\x1b\\`);
    }
    buildVars(input) {
        const keyValues = [];
        for (const [k, v] of Object.entries(input)) {
            if (!v) {
                continue;
            }
            const val = osc7501_isBase64able(k)
                ? this.bufferManager.encodeBase64(v.toString())
                : v.toString();
            keyValues.push([k, val]);
        }
        return keyValues;
    }
};
OSC7501Reporter = __decorate([
    injectable(),
    __param(0, inject('BufferManager')),
    __param(1, inject('ProcessOutputEmitter')),
    __param(2, inject('ProductManifest')),
    __metadata("design:paramtypes", [Object, Object, Object])
], OSC7501Reporter);
export { OSC7501Reporter };
