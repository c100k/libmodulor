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
var MistralAILLMManager_1;
import { inject, injectable } from 'inversify';
let MistralAILLMManager = class MistralAILLMManager {
    static { MistralAILLMManager_1 = this; }
    httpAPICaller;
    settingsManager;
    static BASE_URL = 'https://api.mistral.ai/v1';
    constructor(httpAPICaller, settingsManager) {
        this.httpAPICaller = httpAPICaller;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            mai_api_key: this.settingsManager.get()('mai_api_key'),
        };
    }
    async send(req, opts) {
        return await this.httpAPICaller.exec({
            authorizationHeader: {
                prefix: 'Bearer',
                value: opts?.auth?.apiKey ?? this.s().mai_api_key,
            },
            errBuilder: async (error) => {
                if ('message' in error) {
                    return error.message;
                }
                return error.detail.map((d) => d.msg).join('\n');
            },
            method: 'POST',
            req: {
                builder: async () => req,
                envelope: 'json',
            },
            urlBuilder: async () => `${MistralAILLMManager_1.BASE_URL}/chat/completions`,
        });
    }
};
MistralAILLMManager = MistralAILLMManager_1 = __decorate([
    injectable(),
    __param(0, inject('HTTPAPICaller')),
    __param(1, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object, Object])
], MistralAILLMManager);
export { MistralAILLMManager };
