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
var ServerRequestHandler_1;
import { inject, injectable } from 'inversify';
import { IllegalArgumentError, isEmptyJSON } from '../../../error/index.js';
import { UCBuilder, UCOutputReader, UCOutputSideEffectType, } from '../../../uc/index.js';
import { AuthCookieCreator, } from './AuthCookieCreator.js';
import { AuthenticationChecker } from './AuthenticationChecker.js';
import { CustomerFacingErrorBuilder } from './CustomerFacingErrorBuilder.js';
import { PublicApiKeyChecker } from './PublicApiKeyChecker.js';
import { RequestChecker } from './RequestChecker.js';
import { RequestLogger } from './RequestLogger.js';
let ServerRequestHandler = class ServerRequestHandler {
    static { ServerRequestHandler_1 = this; }
    authCookieCreator;
    authenticationChecker;
    customerFacingErrorBuilder;
    publicApiKeyChecker;
    requestChecker;
    requestLogger;
    settingsManager;
    ucBuilder;
    static AUTHORIZATION_HEADER_NAME = 'Authorization';
    static X_FORWARDED_PROTO_HEADER_NAME = 'X-Forwarded-Proto';
    constructor(authCookieCreator, authenticationChecker, customerFacingErrorBuilder, publicApiKeyChecker, requestChecker, requestLogger, settingsManager, ucBuilder) {
        this.authCookieCreator = authCookieCreator;
        this.authenticationChecker = authenticationChecker;
        this.customerFacingErrorBuilder = customerFacingErrorBuilder;
        this.publicApiKeyChecker = publicApiKeyChecker;
        this.requestChecker = requestChecker;
        this.requestLogger = requestLogger;
        this.settingsManager = settingsManager;
        this.ucBuilder = ucBuilder;
    }
    s() {
        return {
            server_cookies_name_auth: this.settingsManager.get()('server_cookies_name_auth'),
            server_public_api_key_header_name: this.settingsManager.get()('server_public_api_key_header_name'),
        };
    }
    async exec({ appManifest, envelope, execOpts, req, res, ucd, ucManager, }) {
        try {
            const { bodyRaw, cookie, header, method, secure, url } = req;
            this.requestLogger.exec({
                body: bodyRaw,
                method,
                url,
            });
            this.requestChecker.exec({
                secure,
                url,
                xForwardedProtoHeader: await header(ServerRequestHandler_1.X_FORWARDED_PROTO_HEADER_NAME),
            });
            const { ext, sec } = ucd;
            await this.publicApiKeyChecker.exec({
                checkType: sec?.publicApiKeyCheckType,
                value: await header(this.s().server_public_api_key_header_name),
            });
            const uc = this.ucBuilder.exec({
                appManifest,
                auth: null,
                def: ucd,
            });
            const { auth } = await this.authenticationChecker.exec({
                authCookie: await cookie(this.s().server_cookies_name_auth),
                authorizationHeader: await header(ServerRequestHandler_1.AUTHORIZATION_HEADER_NAME),
                uc,
            });
            if (auth) {
                uc.auth = auth;
            }
            await this.fill(req, envelope, uc);
            const output = await ucManager.execServer(uc, execOpts);
            const { status } = await this.applySideEffects(res, ucd, output);
            if (status !== undefined) {
                return {
                    body: undefined,
                    status,
                };
            }
            if (!output) {
                return {
                    body: undefined,
                    status: 204,
                };
            }
            const transform = ext?.http?.transform;
            return {
                body: transform ? transform(output) : output,
                status: 200,
            };
        }
        catch (err) {
            const { error } = this.customerFacingErrorBuilder.exec({
                error: err,
            });
            return {
                body: error.toObj(),
                status: error.httpStatus,
            };
        }
    }
    async fill(req, envelope, uc) {
        switch (envelope) {
            case 'form-data': {
                uc.fill((await req.bodyFromFormData()));
                break;
            }
            case 'json':
                try {
                    uc.fill((await req.bodyFromJSON()));
                }
                catch (err) {
                    if (isEmptyJSON(err)) {
                        break;
                    }
                    throw new IllegalArgumentError();
                }
                break;
            case 'query-params':
                uc.fill((await req.bodyFromQueryParams()));
                break;
            default:
                envelope;
        }
    }
    async applySideEffects(res, ucd, output) {
        const { io } = ucd;
        const sideEffects = io.o?.sideEffects;
        if (!sideEffects) {
            return { status: undefined };
        }
        const ucor = new UCOutputReader(ucd, output ?? undefined);
        let item;
        if (ucor.canItem00()) {
            item = ucor.item00().item;
        }
        for (const se of sideEffects) {
            const { type } = se;
            switch (type) {
                case UCOutputSideEffectType.CLEAR_AUTH:
                    await this.applyClearAuthSideEffect(res);
                    break;
                case UCOutputSideEffectType.REDIRECT:
                    await this.applyRedirectSideEffect(res, item);
                    return { status: 302 };
                case UCOutputSideEffectType.SET_AUTH:
                    await this.applySetAuthSideEffect(res, item);
                    break;
                default:
                    (type);
            }
        }
        return { status: undefined };
    }
    async applyClearAuthSideEffect(res) {
        res.clearCookie(this.s().server_cookies_name_auth);
    }
    async applyRedirectSideEffect(res, item) {
        if (!item ||
            !('redirect' in item) ||
            typeof item.redirect !== 'string') {
            return;
        }
        const { redirect } = item;
        res.redirect(redirect);
    }
    async applySetAuthSideEffect(res, item) {
        if (!item || !('jwt' in item) || typeof item.jwt !== 'string') {
            return;
        }
        const { jwt } = item;
        const output = await this.authCookieCreator.exec({
            jwt,
        });
        res.setCookie(output);
    }
};
ServerRequestHandler = ServerRequestHandler_1 = __decorate([
    injectable(),
    __param(0, inject(AuthCookieCreator)),
    __param(1, inject(AuthenticationChecker)),
    __param(2, inject(CustomerFacingErrorBuilder)),
    __param(3, inject(PublicApiKeyChecker)),
    __param(4, inject(RequestChecker)),
    __param(5, inject(RequestLogger)),
    __param(6, inject('SettingsManager')),
    __param(7, inject(UCBuilder)),
    __metadata("design:paramtypes", [AuthCookieCreator,
        AuthenticationChecker,
        CustomerFacingErrorBuilder,
        PublicApiKeyChecker,
        RequestChecker,
        RequestLogger, Object, UCBuilder])
], ServerRequestHandler);
export { ServerRequestHandler };
