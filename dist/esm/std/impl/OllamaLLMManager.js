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
import { IllegalArgumentError } from '../../error/index.js';
let OllamaLLMManager = class OllamaLLMManager {
    httpAPICaller;
    settingsManager;
    constructor(httpAPICaller, settingsManager) {
        this.httpAPICaller = httpAPICaller;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            oll_base_url: this.settingsManager.get()('oll_base_url'),
        };
    }
    async send(req) {
        const firstMessage = req.messages[0];
        if (!firstMessage) {
            throw new IllegalArgumentError('Please provide at least one message');
        }
        return await this.httpAPICaller.exec({
            errBuilder: async (error) => error.error,
            method: 'POST',
            outputBuilder: async (res) => ({
                choices: [{ message: { content: res.response } }],
            }),
            req: {
                builder: async () => ({
                    model: req.model,
                    prompt: firstMessage.content,
                    stream: false,
                }),
                envelope: 'json',
            },
            urlBuilder: async () => `${this.s().oll_base_url}/api/generate`,
        });
    }
};
OllamaLLMManager = __decorate([
    injectable(),
    __param(0, inject('HTTPAPICaller')),
    __param(1, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object, Object])
], OllamaLLMManager);
export { OllamaLLMManager };
