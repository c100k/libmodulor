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
import { UCBuilder, UCOutputSideEffectType, } from '../../../../uc/index.js';
import { resAborted, resError, resObj } from '../funcs.js';
let MCPStdioRequestHandler = class MCPStdioRequestHandler {
    authDataStore;
    jwtManager;
    ucBuilder;
    constructor(authDataStore, jwtManager, ucBuilder) {
        this.authDataStore = authDataStore;
        this.jwtManager = jwtManager;
        this.ucBuilder = ucBuilder;
    }
    async exec({ appManifest, toolInput, ucd, ucManager, }) {
        try {
            const auth = await this.auth();
            const uc = this.ucBuilder.exec({
                appManifest,
                auth,
                def: ucd,
            });
            if (toolInput) {
                const { _reserved, ...rest } = toolInput;
                uc.fill(rest);
                if (_reserved?.confirmed === undefined) {
                    await ucManager.confirmClient(uc);
                    // ... throws an error
                }
                else if (_reserved.confirmed === false) {
                    return resAborted();
                }
            }
            const ucor = await ucManager.execClient(uc);
            await this.applySideEffects(ucor);
            return resObj(ucor.output());
        }
        catch (err) {
            return resError(err);
        }
    }
    async auth() {
        // TODO : Memoize the auth instead of decoding each time
        const jwt = await this.authDataStore.get();
        if (!jwt) {
            return null;
        }
        return this.jwtManager.decodeUnsafe(jwt);
    }
    async applySideEffects(ucor) {
        const { io } = ucor.ucd();
        const sideEffects = io.o?.sideEffects;
        if (!sideEffects) {
            return;
        }
        let item;
        if (ucor.canItem00()) {
            item = ucor.item00().item;
        }
        for (const se of sideEffects) {
            const { type } = se;
            switch (type) {
                case UCOutputSideEffectType.CLEAR_AUTH:
                    await this.applyClearAuthSideEffect();
                    return;
                case UCOutputSideEffectType.REDIRECT:
                    await this.applyRedirectSideEffect(item);
                    return;
                case UCOutputSideEffectType.SET_AUTH:
                    await this.applySetAuthSideEffect(item);
                    return;
                default:
                    (type);
            }
        }
    }
    async applyClearAuthSideEffect() {
        await this.authDataStore.set(null);
    }
    async applyRedirectSideEffect(_item) {
        // Nothing to do
    }
    async applySetAuthSideEffect(item) {
        if (!item || !('jwt' in item) || typeof item.jwt !== 'string') {
            return;
        }
        const { jwt } = item;
        await this.authDataStore.set(jwt);
    }
};
MCPStdioRequestHandler = __decorate([
    injectable(),
    __param(0, inject('AuthDataStore')),
    __param(1, inject('JWTManager')),
    __param(2, inject(UCBuilder)),
    __metadata("design:paramtypes", [Object, Object, UCBuilder])
], MCPStdioRequestHandler);
export { MCPStdioRequestHandler };
