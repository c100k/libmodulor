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
import { PublicApiKeyChecker } from '../../lib/server/PublicApiKeyChecker.js';
let PublicApiKeyCheckerMiddlewareBuilder = class PublicApiKeyCheckerMiddlewareBuilder {
    publicApiKeyChecker;
    settingsManager;
    constructor(publicApiKeyChecker, settingsManager) {
        this.publicApiKeyChecker = publicApiKeyChecker;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            server_public_api_key_header_name: this.settingsManager.get()('server_public_api_key_header_name'),
        };
    }
    exec({ checkType }) {
        return async (req, _res, nextFn) => {
            const value = req.header(this.s().server_public_api_key_header_name);
            await this.publicApiKeyChecker.exec({
                checkType,
                value,
            });
            nextFn();
        };
    }
};
PublicApiKeyCheckerMiddlewareBuilder = __decorate([
    injectable(),
    __param(0, inject(PublicApiKeyChecker)),
    __param(1, inject('SettingsManager')),
    __metadata("design:paramtypes", [PublicApiKeyChecker, Object])
], PublicApiKeyCheckerMiddlewareBuilder);
export { PublicApiKeyCheckerMiddlewareBuilder };
