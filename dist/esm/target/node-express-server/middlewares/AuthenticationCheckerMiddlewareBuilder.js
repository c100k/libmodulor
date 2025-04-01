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
import { UCBuilder, } from '../../../uc/index.js';
import { AuthenticationChecker, } from '../../lib/server/AuthenticationChecker.js';
export function isReqAuthenticated(req) {
    return !!req.auth;
}
let AuthenticationCheckerMiddlewareBuilder = class AuthenticationCheckerMiddlewareBuilder {
    authenticationChecker;
    settingsManager;
    ucBuilder;
    constructor(authenticationChecker, settingsManager, ucBuilder) {
        this.authenticationChecker = authenticationChecker;
        this.settingsManager = settingsManager;
        this.ucBuilder = ucBuilder;
    }
    s() {
        return {
            server_cookies_name_auth: this.settingsManager.get()('server_cookies_name_auth'),
        };
    }
    exec({ appManifest, ucd }) {
        return async (req, _res, nextFn) => {
            const authCookie = req.cookies[this.s().server_cookies_name_auth];
            const authorizationHeader = req.headers.authorization;
            const uc = this.ucBuilder.exec({
                appManifest,
                auth: null,
                def: ucd,
            });
            const { auth } = await this.authenticationChecker.exec({
                authCookie,
                authorizationHeader,
                uc,
            });
            if (auth) {
                req.auth = auth;
            }
            nextFn();
        };
    }
};
AuthenticationCheckerMiddlewareBuilder = __decorate([
    injectable(),
    __param(0, inject(AuthenticationChecker)),
    __param(1, inject('SettingsManager')),
    __param(2, inject(UCBuilder)),
    __metadata("design:paramtypes", [AuthenticationChecker, Object, UCBuilder])
], AuthenticationCheckerMiddlewareBuilder);
export { AuthenticationCheckerMiddlewareBuilder };
