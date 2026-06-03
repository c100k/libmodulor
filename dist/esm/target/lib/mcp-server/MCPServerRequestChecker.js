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
import { logDevWarning } from '../../../error/index.js';
import { JWTAuthenticationChecker } from '../server/JWTAuthenticationChecker.js';
import { PublicApiKeyChecker } from '../server/PublicApiKeyChecker.js';
let MCPServerRequestChecker = class MCPServerRequestChecker {
    jwtAuthenticationChecker;
    publicApiKeyChecker;
    settingsManager;
    constructor(jwtAuthenticationChecker, publicApiKeyChecker, settingsManager) {
        this.jwtAuthenticationChecker = jwtAuthenticationChecker;
        this.publicApiKeyChecker = publicApiKeyChecker;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            server_mcp_dangerously_skip_auth_check: this.settingsManager.get()('server_mcp_dangerously_skip_auth_check'),
            server_mcp_dangerously_skip_pub_api_key_check: this.settingsManager.get()('server_mcp_dangerously_skip_pub_api_key_check'),
            server_public_api_key_header_name: this.settingsManager.get()('server_public_api_key_header_name'),
        };
    }
    async exec({ req }) {
        const { header } = req;
        if (this.s().server_mcp_dangerously_skip_pub_api_key_check) {
            logDevWarning('Skipping pub api key check');
        }
        else {
            await this.publicApiKeyChecker.exec({
                checkType: 'on',
                value: await header(this.s().server_public_api_key_header_name),
            });
        }
        if (this.s().server_mcp_dangerously_skip_auth_check) {
            logDevWarning('Skipping auth check');
        }
        else {
            const authorizationHeader = await header('Authorization');
            const auth = await this.jwtAuthenticationChecker.exec({
                rawValue: authorizationHeader,
            });
            if (!auth) {
                return {
                    status: 401,
                };
            }
        }
        return {
            status: null,
        };
    }
};
MCPServerRequestChecker = __decorate([
    injectable(),
    __param(0, inject(JWTAuthenticationChecker)),
    __param(1, inject(PublicApiKeyChecker)),
    __param(2, inject('SettingsManager')),
    __metadata("design:paramtypes", [JWTAuthenticationChecker,
        PublicApiKeyChecker, Object])
], MCPServerRequestChecker);
export { MCPServerRequestChecker };
