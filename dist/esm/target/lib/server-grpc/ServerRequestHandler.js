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
import { status } from '@grpc/grpc-js';
import { inject, injectable } from 'inversify';
import { logDevWarning } from '../../../error/index.js';
import { UCBuilder, UCOutputReader, UCOutputSideEffectType, } from '../../../uc/index.js';
import { AuthenticationChecker } from '../server/AuthenticationChecker.js';
import { CustomerFacingErrorBuilder } from '../server/CustomerFacingErrorBuilder.js';
import { PublicApiKeyChecker } from '../server/PublicApiKeyChecker.js';
import { RequestChecker } from '../server/RequestChecker.js';
import { RequestLogger } from '../server/RequestLogger.js';
import { AUTHORIZATION_HEADER_NAME, X_FORWARDED_PROTO_HEADER_NAME, } from '../shared.js';
import { errToStatus } from './errors.js';
let ServerRequestHandler = class ServerRequestHandler {
    authenticationChecker;
    customerFacingErrorBuilder;
    publicApiKeyChecker;
    requestChecker;
    requestLogger;
    settingsManager;
    ucBuilder;
    constructor(authenticationChecker, customerFacingErrorBuilder, publicApiKeyChecker, requestChecker, requestLogger, settingsManager, ucBuilder) {
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
            server_tmp_path: this.settingsManager.get()('server_tmp_path'),
        };
    }
    async exec({ appManifest, dangerouslySkipAuthCheck = false, dangerouslySkipPubApiKeyCheck = false, execOpts, req, res, skipSideEffects = false, ucd, ucManager, }) {
        try {
            const { bodyRaw, metadata, secure, url } = req;
            this.requestLogger.exec({
                body: bodyRaw,
                method: 'RPC',
                url,
            });
            this.requestChecker.exec({
                secure,
                url,
                xForwardedProtoHeader: await metadata(X_FORWARDED_PROTO_HEADER_NAME),
            });
            const { ext, sec } = ucd;
            if (dangerouslySkipPubApiKeyCheck) {
                logDevWarning('Skipping pub api key check');
            }
            else {
                await this.publicApiKeyChecker.exec({
                    checkType: sec?.publicApiKeyCheckType,
                    value: await metadata(this.s().server_public_api_key_header_name),
                });
            }
            const uc = this.ucBuilder.exec({
                appManifest,
                auth: null,
                def: ucd,
            });
            if (dangerouslySkipAuthCheck) {
                logDevWarning('Skipping auth check');
            }
            else {
                const { auth } = await this.authenticationChecker.exec({
                    authCookie: undefined,
                    authorizationHeader: await metadata(AUTHORIZATION_HEADER_NAME),
                    uc,
                });
                if (auth) {
                    uc.auth = auth;
                }
            }
            await this.fill(req, uc);
            const output = await ucManager.execServer(uc, execOpts);
            if (!skipSideEffects) {
                await this.applySideEffects(res, ucd, output);
            }
            if (!output) {
                return {
                    body: undefined,
                    status: status.OK,
                };
            }
            // TODO : Make this respect the contract defined in the GRPC type
            const transform = ext?.http?.transform;
            return {
                body: transform ? transform(output) : output,
                status: status.OK,
            };
        }
        catch (err) {
            const { error } = this.customerFacingErrorBuilder.exec({
                error: err,
            });
            return {
                body: error.toObj(),
                rawErr: err,
                status: errToStatus(error),
            };
        }
    }
    async fill(req, uc) {
        const body = await req.bodyFromRequest();
        if (!body) {
            return;
        }
        uc.fill(body);
    }
    async applySideEffects(res, ucd, output) {
        const { io } = ucd;
        const sideEffects = io.o?.sideEffects;
        if (!sideEffects) {
            return;
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
                    break;
                case UCOutputSideEffectType.SET_AUTH:
                    await this.applySetAuthSideEffect(res, item);
                    break;
                default:
                    (type);
            }
        }
    }
    async applyClearAuthSideEffect(res) {
        await res.setMetadata(AUTHORIZATION_HEADER_NAME, '');
    }
    async applyRedirectSideEffect(res, item) {
        if (!item ||
            !('redirect' in item) ||
            typeof item.redirect !== 'string') {
            return;
        }
        const { redirect } = item;
        res.setMetadata('redirect', redirect);
    }
    async applySetAuthSideEffect(res, item) {
        if (!item || !('jwt' in item) || typeof item.jwt !== 'string') {
            return;
        }
        const { jwt } = item;
        await res.setMetadata(AUTHORIZATION_HEADER_NAME, jwt);
    }
};
ServerRequestHandler = __decorate([
    injectable(),
    __param(0, inject(AuthenticationChecker)),
    __param(1, inject(CustomerFacingErrorBuilder)),
    __param(2, inject(PublicApiKeyChecker)),
    __param(3, inject(RequestChecker)),
    __param(4, inject(RequestLogger)),
    __param(5, inject('SettingsManager')),
    __param(6, inject(UCBuilder)),
    __metadata("design:paramtypes", [AuthenticationChecker,
        CustomerFacingErrorBuilder,
        PublicApiKeyChecker,
        RequestChecker,
        RequestLogger, Object, UCBuilder])
], ServerRequestHandler);
export { ServerRequestHandler };
