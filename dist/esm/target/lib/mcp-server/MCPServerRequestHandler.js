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
import { ServerRequestHandler, } from '../server/ServerRequestHandler.js';
import { resError, resObj } from './funcs.js';
let MCPServerRequestHandler = class MCPServerRequestHandler {
    serverRequestHandler;
    settingsManager;
    constructor(serverRequestHandler, settingsManager) {
        this.serverRequestHandler = serverRequestHandler;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            server_mcp_dangerously_skip_auth_check: this.settingsManager.get()('server_mcp_dangerously_skip_auth_check'),
            server_mcp_dangerously_skip_pub_api_key_check: this.settingsManager.get()('server_mcp_dangerously_skip_pub_api_key_check'),
        };
    }
    async exec({ appManifest, envelope, execOpts, req, res, ucd, ucManager, }) {
        const { body, rawErr } = await this.serverRequestHandler.exec({
            appManifest,
            dangerouslySkipAuthCheck: this.s().server_mcp_dangerously_skip_auth_check,
            dangerouslySkipPubApiKeyCheck: this.s().server_mcp_dangerously_skip_pub_api_key_check,
            envelope,
            execOpts,
            req,
            res,
            skipSideEffects: true,
            ucd,
            ucManager,
        });
        if (rawErr) {
            return resError(rawErr);
        }
        return resObj(body);
    }
};
MCPServerRequestHandler = __decorate([
    injectable(),
    __param(0, inject(ServerRequestHandler)),
    __param(1, inject('SettingsManager')),
    __metadata("design:paramtypes", [ServerRequestHandler, Object])
], MCPServerRequestHandler);
export { MCPServerRequestHandler };
