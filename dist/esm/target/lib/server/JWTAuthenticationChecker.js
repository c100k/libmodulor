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
let JWTAuthenticationChecker = class JWTAuthenticationChecker {
    jwtManager;
    logger;
    settingsManager;
    constructor(jwtManager, logger, settingsManager) {
        this.jwtManager = jwtManager;
        this.logger = logger;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            jwt_manager_invalidate_issued_before: this.settingsManager.get()('jwt_manager_invalidate_issued_before'),
        };
    }
    async exec({ rawValue }) {
        const value = rawValue?.replace('JWT ', '');
        if (!value) {
            return null;
        }
        try {
            const payload = await this.jwtManager.decode(value);
            this.logger.trace('JWT', { payload });
            const toInvalidate = this.mustBeInvalidated(payload);
            if (toInvalidate) {
                return null;
            }
            return payload;
        }
        catch (err) {
            if (err instanceof UnauthorizedError) {
                return null;
            }
            throw err;
        }
    }
    mustBeInvalidated(payload) {
        const limit = this.s().jwt_manager_invalidate_issued_before;
        if (limit === null) {
            return false;
        }
        const { iat } = payload;
        if (iat === undefined) {
            this.logger.warn('JWT has no iat => mark as to invalidate', {
                iat,
                limit,
            });
            return true;
        }
        const diff = limit - iat;
        if (diff >= 0) {
            this.logger.warn('JWT issued before the limit => mark as to invalidate', { diff, iat, limit });
            return true;
        }
        return false;
    }
};
JWTAuthenticationChecker = __decorate([
    injectable(),
    __param(0, inject('JWTManager')),
    __param(1, inject('Logger')),
    __param(2, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object, Object, Object])
], JWTAuthenticationChecker);
export { JWTAuthenticationChecker };
