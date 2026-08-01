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
let RequestFileHandler = class RequestFileHandler {
    clockManager;
    cryptoManager;
    fsManager;
    settingsManager;
    constructor(clockManager, cryptoManager, fsManager, settingsManager) {
        this.clockManager = clockManager;
        this.cryptoManager = cryptoManager;
        this.fsManager = fsManager;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            server_tmp_path: this.settingsManager.get()('server_tmp_path'),
        };
    }
    async exec({ buffer }) {
        const name = `tmp-${this.clockManager.nowToKey()}-${await this.cryptoManager.randomString(16)}`;
        const uri = this.fsManager.path(this.s().server_tmp_path, name);
        await this.fsManager.touch(uri, buffer);
        const { size, mimeType } = await this.fsManager.info(uri);
        return {
            file: {
                name,
                size,
                type: mimeType ?? 'application/octet-stream',
                uri,
            },
        };
    }
};
RequestFileHandler = __decorate([
    injectable(),
    __param(0, inject('ClockManager')),
    __param(1, inject('CryptoManager')),
    __param(2, inject('FSManager')),
    __param(3, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], RequestFileHandler);
export { RequestFileHandler };
