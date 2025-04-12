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
let ServerSSLCertLoader = class ServerSSLCertLoader {
    fsManager;
    settingsManager;
    constructor(fsManager, settingsManager) {
        this.fsManager = fsManager;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            server_ssl_fullchain_path: this.settingsManager.get()('server_ssl_fullchain_path'),
            server_ssl_key_path: this.settingsManager.get()('server_ssl_key_path'),
        };
    }
    async exec(_input) {
        const fullchainPath = this.s().server_ssl_fullchain_path;
        const keyPath = this.s().server_ssl_key_path;
        if (!fullchainPath || !keyPath) {
            throw new Error('You must provide server_ssl_fullchain_path and server_ssl_key_path to start on secure port 443');
        }
        return {
            cert: await this.fsManager.cat(fullchainPath),
            key: await this.fsManager.cat(keyPath),
        };
    }
};
ServerSSLCertLoader = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __param(1, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object, Object])
], ServerSSLCertLoader);
export { ServerSSLCertLoader };
