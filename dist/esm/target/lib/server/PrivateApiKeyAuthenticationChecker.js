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
import { capitalize } from '../../../utils/index.js';
let PrivateApiKeyAuthenticationChecker = class PrivateApiKeyAuthenticationChecker {
    settingsManager;
    constructor(settingsManager) {
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            server_private_api_key_entries: this.settingsManager.get()('server_private_api_key_entries'),
        };
    }
    async exec({ rawValue }) {
        const value = rawValue?.replace('Bearer ', '');
        if (!value) {
            return null;
        }
        const exists = this.s().server_private_api_key_entries.find((key) => key === value);
        if (!exists) {
            return null;
        }
        return {
            organization: {
                id: '',
            },
            role: 'admin',
            user: {
                firstname: capitalize('admin'),
                id: '',
                initials: '',
            },
        };
    }
};
PrivateApiKeyAuthenticationChecker = __decorate([
    injectable(),
    __param(0, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object])
], PrivateApiKeyAuthenticationChecker);
export { PrivateApiKeyAuthenticationChecker };
