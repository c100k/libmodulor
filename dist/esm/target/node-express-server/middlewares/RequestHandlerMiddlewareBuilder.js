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
import { UCBuilder, UCOutputReader, UCOutputSideEffectType, } from '../../../uc/index.js';
import { AuthCookieCreator } from '../lib/AuthCookieCreator.js';
import { isReqAuthenticated } from './AuthenticationCheckerMiddlewareBuilder.js';
let RequestHandlerMiddlewareBuilder = class RequestHandlerMiddlewareBuilder {
    authCookieCreator;
    settingsManager;
    ucBuilder;
    constructor(authCookieCreator, settingsManager, ucBuilder) {
        this.authCookieCreator = authCookieCreator;
        this.settingsManager = settingsManager;
        this.ucBuilder = ucBuilder;
    }
    s() {
        return {
            server_cookies_name_auth: this.settingsManager.get()('server_cookies_name_auth'),
        };
    }
    exec({ appManifest, envelope, ucd, ucManager, }) {
        return async (req, res) => {
            const uc = this.ucBuilder.exec({
                appManifest,
                auth: null,
                def: ucd,
            });
            if (isReqAuthenticated(req)) {
                uc.auth = req.auth;
            }
            this.fillUCFromReq(req, envelope, uc);
            const output = await ucManager.execServer(uc);
            const { ext, io } = ucd;
            const sideEffects = io.o?.sideEffects;
            if (sideEffects) {
                const ucor = new UCOutputReader(uc.def, output ?? undefined);
                let item;
                if (ucor.canItem00()) {
                    item = ucor.item00().item;
                }
                // Be careful with this, as some are incompatible.
                // For instance, if there is a REDIRECT and then a CLEAR_AUTH, the latter won't be executed as we return after the redirect.
                for (const se of sideEffects) {
                    const { type } = se;
                    switch (type) {
                        case UCOutputSideEffectType.CLEAR_AUTH:
                            await this.handleClearAuth(res);
                            break;
                        case UCOutputSideEffectType.REDIRECT:
                            await this.handleRedirect(res, item);
                            return;
                        case UCOutputSideEffectType.SET_AUTH:
                            await this.handleSetAuth(res, item);
                            break;
                        default:
                            ((_) => { })(type);
                    }
                }
            }
            if (!output) {
                res.status(204).send();
                return;
            }
            const transform = ext?.http?.transform;
            res.send(output && transform ? transform(output) : output);
        };
    }
    fillUCFromReq(req, envelope, uc) {
        switch (envelope) {
            case 'form-data': {
                // Since express v5, if the request contains only a file, the `req.body` returns `undefined`
                const input = req.body ?? {};
                // files is present when using express-fileupload
                if ('files' in req && req.files) {
                    for (const [field, value] of Object.entries(req.files)) {
                        input[field] = Array.isArray(value)
                            ? value.map(this.toFile)
                            : this.toFile(value);
                    }
                }
                // TODO : Change this ugly code
                // When a field has multiple values, they key is `field[]` and not `field`
                const sanitized = {};
                for (const [k, v] of Object.entries(input)) {
                    const sanitizedKey = k.split('[')[0];
                    if (!sanitizedKey) {
                        continue;
                    }
                    sanitized[sanitizedKey] = v;
                    // For some reason, when there is only one value, it is received as scalar and not as an array
                    // Even if there is only one, we want an array
                    if (k.includes('[') && !Array.isArray(v)) {
                        sanitized[sanitizedKey] = [v];
                    }
                }
                uc.fill(sanitized);
                break;
            }
            case 'json':
                uc.fill(req.body);
                break;
            case 'query-params':
                uc.fill(req.query);
                break;
        }
    }
    async handleClearAuth(res) {
        res.clearCookie(this.s().server_cookies_name_auth);
    }
    async handleRedirect(res, item) {
        if (!item ||
            !('redirect' in item) ||
            typeof item['redirect'] !== 'string') {
            return;
        }
        const { redirect } = item;
        res.redirect(redirect);
    }
    async handleSetAuth(res, item) {
        if (!item || !('jwt' in item) || typeof item['jwt'] !== 'string') {
            return;
        }
        const { jwt } = item;
        const { name, opts, val } = await this.authCookieCreator.exec({
            jwt,
        });
        res.cookie(name, val, opts);
    }
    toFile(f) {
        return {
            name: f.name,
            path: f.tempFilePath,
            type: f.mimetype,
        };
    }
};
RequestHandlerMiddlewareBuilder = __decorate([
    injectable(),
    __param(0, inject(AuthCookieCreator)),
    __param(1, inject('SettingsManager')),
    __param(2, inject(UCBuilder)),
    __metadata("design:paramtypes", [AuthCookieCreator, Object, UCBuilder])
], RequestHandlerMiddlewareBuilder);
export { RequestHandlerMiddlewareBuilder };
