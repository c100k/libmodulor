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
import { ForbiddenError } from '../../../error/index.js';
let RequestChecker = class RequestChecker {
    environmentManager;
    logger;
    settingsManager;
    constructor(environmentManager, logger, settingsManager) {
        this.environmentManager = environmentManager;
        this.logger = logger;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            server_binding_port: this.settingsManager.get()('server_binding_port'),
        };
    }
    exec({ secure, url, xForwardedProtoHeader }) {
        const isSecure = secure; // https://localhost:8443
        const isSecureForwarded = xForwardedProtoHeader === 'https'; // https://domain.com => http://localhost:8080
        const isNotProd = !this.environmentManager.isProd(); // http://localhost:8443
        const isSSLCertificateCheck = !!url.match(/^\/\.well-known\/acme-challenge\/(.*)/); // http://localhost:8443/.well-known/acme-challenge/ywml7k8e8qxdjwFf1pN4hIKWJ1Jrc0CvAP3t9PSmnzw
        this.logger.trace('Request checker', {
            isNotProd,
            isSSLCertificateCheck,
            isSecure,
            isSecureForwarded,
        });
        const allowed = isSecure || isSecureForwarded || isNotProd || isSSLCertificateCheck;
        if (!allowed) {
            // Not sure it's the right HTTP status to send in these cases but not a big deal for now
            throw new ForbiddenError();
        }
    }
};
RequestChecker = __decorate([
    injectable(),
    __param(0, inject('EnvironmentManager')),
    __param(1, inject('Logger')),
    __param(2, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object, Object, Object])
], RequestChecker);
export { RequestChecker };
