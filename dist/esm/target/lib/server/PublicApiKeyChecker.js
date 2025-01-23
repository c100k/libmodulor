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
import { UnauthorizedError } from '../../../error/index.js';
import { DEFAULT_UC_SEC_PAKCT, } from '../../../uc/index.js';
let PublicApiKeyChecker = class PublicApiKeyChecker {
    logger;
    settingsManager;
    constructor(logger, settingsManager) {
        this.logger = logger;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            server_public_api_key_entries: this.settingsManager.get()('server_public_api_key_entries'),
        };
    }
    async exec({ checkType = DEFAULT_UC_SEC_PAKCT, value, }) {
        this.logger.trace('Checking apiKey', { checkType, value });
        let allowed = false;
        switch (checkType) {
            case 'off':
                allowed = true;
                break;
            case 'on':
                if (value && !Array.isArray(value)) {
                    const exists = this.s().server_public_api_key_entries.find((key) => key === value);
                    allowed = exists !== undefined;
                }
                break;
            default:
                ((_) => { })(checkType);
        }
        if (!allowed) {
            throw new UnauthorizedError();
        }
    }
};
PublicApiKeyChecker = __decorate([
    injectable(),
    __param(0, inject('Logger')),
    __param(1, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object, Object])
], PublicApiKeyChecker);
export { PublicApiKeyChecker };
