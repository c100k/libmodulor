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
import { DEFAULT_UC_SEC_AT, DEFAULT_UC_SEC_PAKCT } from '../sec/consts.js';
import { rInput } from '../utils/rInput.js';
import { ucHTTPContract } from '../utils/ucHTTPContract.js';
let HTTPUCTransporter = class HTTPUCTransporter {
    httpAPICaller;
    serverClientManager;
    settingsManager;
    constructor(httpAPICaller, serverClientManager, settingsManager) {
        this.httpAPICaller = httpAPICaller;
        this.serverClientManager = serverClientManager;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            server_cookies_name_auth: this.settingsManager.get()('server_cookies_name_auth'),
            server_public_api_key_header_name: this.settingsManager.get()('server_public_api_key_header_name'),
        };
    }
    async send(uc) {
        const { auth, def: { sec }, } = uc;
        const baseURL = await this.serverClientManager.baseURL({ auth });
        const { contentType, envelope, method, path } = ucHTTPContract(uc);
        const additionalHeaders = {};
        let authorizationHeader = undefined;
        let basicAuth = undefined;
        const authType = sec?.authType ?? DEFAULT_UC_SEC_AT;
        const publicApiKeyCheckType = sec?.publicApiKeyCheckType ?? DEFAULT_UC_SEC_PAKCT;
        switch (publicApiKeyCheckType) {
            case 'off':
                break;
            case 'on': {
                const publicApiKey = await this.serverClientManager.publicApiKey();
                const headerName = this.s().server_public_api_key_header_name;
                if (headerName && publicApiKey) {
                    additionalHeaders[headerName] = publicApiKey;
                }
                break;
            }
            default:
                ((_) => { })(publicApiKeyCheckType);
        }
        if (auth) {
            switch (authType) {
                case 'basic': {
                    const basic = await this.serverClientManager.authBasic({
                        auth,
                    });
                    if (basic) {
                        basicAuth = basic;
                    }
                    break;
                }
                case 'apiKey': {
                    const apiKey = await this.serverClientManager.authApiKey({
                        auth,
                    });
                    if (apiKey) {
                        authorizationHeader = {
                            prefix: 'Bearer',
                            value: apiKey,
                        };
                    }
                    break;
                }
                case 'jwt': {
                    const jwt = await this.serverClientManager.authJWT({
                        auth,
                    });
                    if (jwt) {
                        additionalHeaders['Cookie'] =
                            `${this.s().server_cookies_name_auth}=${jwt}`;
                    }
                    break;
                }
                default:
                    ((_) => { })(authType);
            }
        }
        const res = await this.httpAPICaller.exec({
            additionalHeadersBuilder: async () => additionalHeaders,
            authorizationHeader,
            basicAuth,
            contentType,
            errBuilder: async (error) => error.message,
            method,
            req: {
                builder: async () => rInput(uc, { ignoreUndefined: true }),
                envelope,
            },
            urlBuilder: async () => `${baseURL}${path}`,
        });
        if (!res || Object.keys(res).length === 0) {
            return;
        }
        return res;
    }
};
HTTPUCTransporter = __decorate([
    injectable(),
    __param(0, inject('HTTPAPICaller')),
    __param(1, inject('ServerClientManager')),
    __param(2, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object, Object, Object])
], HTTPUCTransporter);
export { HTTPUCTransporter };
