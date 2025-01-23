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
import { ForbiddenError, UnauthorizedError } from '../../../error/index.js';
import { DEFAULT_UC_SEC_AT, } from '../../../uc/index.js';
import { BasicAuthenticationChecker } from './BasicAuthenticationChecker.js';
import { JWTAuthenticationChecker } from './JWTAuthenticationChecker.js';
import { PrivateApiKeyAuthenticationChecker } from './PrivateApiKeyAuthenticationChecker.js';
let AuthenticationChecker = class AuthenticationChecker {
    basicAuthenticationChecker;
    jwtAuthenticationChecker;
    privateApiKeyAuthenticationChecker;
    logger;
    ucPolicyProvider;
    constructor(basicAuthenticationChecker, jwtAuthenticationChecker, privateApiKeyAuthenticationChecker, logger, ucPolicyProvider) {
        this.basicAuthenticationChecker = basicAuthenticationChecker;
        this.jwtAuthenticationChecker = jwtAuthenticationChecker;
        this.privateApiKeyAuthenticationChecker = privateApiKeyAuthenticationChecker;
        this.logger = logger;
        this.ucPolicyProvider = ucPolicyProvider;
    }
    async exec({ authCookie, authorizationHeader, uc, }) {
        this.logger.trace('Checking auth', {
            authCookie,
            authorizationHeader,
        });
        const output = {
            allowed: false,
            auth: null,
        };
        const { lifecycle: { server }, sec, } = uc.def;
        if (typeof server !== 'object') {
            return output;
        }
        const authType = sec?.authType ?? DEFAULT_UC_SEC_AT;
        const policy = (await this.ucPolicyProvider(server.policy));
        const canBeExecutedPreAuth = await policy.canBeExecutedPreAuth();
        if (canBeExecutedPreAuth) {
            const { allowed } = await policy.exec({
                uc,
            });
            output.allowed = allowed;
        }
        else {
            switch (authType) {
                case 'apiKey':
                    if (authorizationHeader &&
                        !Array.isArray(authorizationHeader)) {
                        output.auth =
                            await this.privateApiKeyAuthenticationChecker.exec({
                                rawValue: authorizationHeader,
                            });
                    }
                    break;
                case 'basic':
                    if (authorizationHeader &&
                        !Array.isArray(authorizationHeader)) {
                        output.auth =
                            await this.basicAuthenticationChecker.exec({
                                rawValue: authorizationHeader,
                            });
                    }
                    break;
                case 'jwt':
                    if (authCookie && !Array.isArray(authCookie)) {
                        output.auth = await this.jwtAuthenticationChecker.exec({
                            rawValue: authCookie,
                        });
                    }
                    break;
                default:
                    ((_) => { })(authType);
            }
            uc.auth = output.auth;
            const { allowed } = await policy.exec({ uc });
            output.allowed = allowed;
        }
        if (!output.allowed) {
            if (uc.auth) {
                throw new ForbiddenError();
            }
            throw new UnauthorizedError();
        }
        return output;
    }
};
AuthenticationChecker = __decorate([
    injectable(),
    __param(0, inject(BasicAuthenticationChecker)),
    __param(1, inject(JWTAuthenticationChecker)),
    __param(2, inject(PrivateApiKeyAuthenticationChecker)),
    __param(3, inject('Logger')),
    __param(4, inject('Provider<UCPolicy>')),
    __metadata("design:paramtypes", [BasicAuthenticationChecker,
        JWTAuthenticationChecker,
        PrivateApiKeyAuthenticationChecker, Object, Function])
], AuthenticationChecker);
export { AuthenticationChecker };
