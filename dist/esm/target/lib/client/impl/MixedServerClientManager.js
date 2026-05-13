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
import { SettingsServerClientManager } from '../../../../std/impl/SettingsServerClientManager.js';
let MixedServerClientManager = class MixedServerClientManager {
    authDataStore;
    settingsServerClientManager;
    constructor(authDataStore, settingsServerClientManager) {
        this.authDataStore = authDataStore;
        this.settingsServerClientManager = settingsServerClientManager;
    }
    async authApiKey(opts) {
        return this.settingsServerClientManager.authApiKey(opts);
    }
    async authBasic(opts) {
        return this.settingsServerClientManager.authBasic(opts);
    }
    async authJWT(_opts) {
        return this.authDataStore.get();
    }
    async baseURL(opts) {
        return this.settingsServerClientManager.baseURL(opts);
    }
    async publicApiKey(opts) {
        return this.settingsServerClientManager.publicApiKey(opts);
    }
};
MixedServerClientManager = __decorate([
    injectable(),
    __param(0, inject('AuthDataStore')),
    __param(1, inject(SettingsServerClientManager)),
    __metadata("design:paramtypes", [Object, SettingsServerClientManager])
], MixedServerClientManager);
export { MixedServerClientManager };
