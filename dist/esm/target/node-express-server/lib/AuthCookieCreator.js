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
let AuthCookieCreator = class AuthCookieCreator {
    jwtManager;
    settingsManager;
    constructor(jwtManager, settingsManager) {
        this.jwtManager = jwtManager;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            server_cookies_http_only: this.settingsManager.get()('server_cookies_http_only'),
            server_cookies_name_auth: this.settingsManager.get()('server_cookies_name_auth'),
            server_cookies_same_site: this.settingsManager.get()('server_cookies_same_site'),
            server_cookies_secure: this.settingsManager.get()('server_cookies_secure'),
        };
    }
    async exec({ jwt }) {
        const { exp } = await this.jwtManager.decode(jwt);
        return {
            name: this.s().server_cookies_name_auth,
            opts: {
                expires: exp ? new Date(exp * 1000) : undefined,
                httpOnly: this.s().server_cookies_http_only,
                sameSite: this.s().server_cookies_same_site,
                secure: this.s().server_cookies_secure,
                signed: false, // Not signing to keep it simple and btw, the JWT is already signed
            },
            val: jwt,
        };
    }
};
AuthCookieCreator = __decorate([
    injectable(),
    __param(0, inject('JWTManager')),
    __param(1, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object, Object])
], AuthCookieCreator);
export { AuthCookieCreator };
