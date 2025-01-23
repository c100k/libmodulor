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
let SettingsServerClientManager = class SettingsServerClientManager {
    settingsManager;
    constructor(settingsManager) {
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            server_dangerously_set_api_key: this.settingsManager.get()('server_dangerously_set_api_key'),
            server_dangerously_set_basic: this.settingsManager.get()('server_dangerously_set_basic'),
            server_dangerously_set_jwts: this.settingsManager.get()('server_dangerously_set_jwts'),
            server_public_api_key: this.settingsManager.get()('server_public_api_key'),
            server_public_api_key_header_name: this.settingsManager.get()('server_public_api_key_header_name'),
            server_public_url: this.settingsManager.get()('server_public_url'),
        };
    }
    async authApiKey(_opts) {
        return this.s().server_dangerously_set_api_key ?? null;
    }
    async authBasic(_opts) {
        return this.s().server_dangerously_set_basic ?? null;
    }
    async authJWT(opts) {
        let jwt = null;
        if (opts?.auth) {
            jwt =
                this.s().server_dangerously_set_jwts?.[opts.auth.role] ?? null;
        }
        return jwt;
    }
    async baseURL(_opts) {
        const url = this.s().server_public_url;
        if (!url) {
            throw new Error('You need to set the server public url');
        }
        return url;
    }
    async publicApiKey(_opts) {
        return this.s().server_public_api_key;
    }
};
SettingsServerClientManager = __decorate([
    injectable(),
    __param(0, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object])
], SettingsServerClientManager);
export { SettingsServerClientManager };
