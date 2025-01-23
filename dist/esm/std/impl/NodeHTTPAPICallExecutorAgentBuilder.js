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
import http from 'node:http';
import https from 'node:https';
import { inject, injectable } from 'inversify';
let NodeHTTPAPICallExecutorAgentBuilder = class NodeHTTPAPICallExecutorAgentBuilder {
    environmentManager;
    constructor(environmentManager) {
        this.environmentManager = environmentManager;
    }
    exec({ url, }) {
        if (url.protocol.startsWith('https')) {
            return new https.Agent({
                rejectUnauthorized: this.environmentManager.isProd(),
            });
        }
        return new http.Agent();
    }
};
NodeHTTPAPICallExecutorAgentBuilder = __decorate([
    injectable(),
    __param(0, inject('EnvironmentManager')),
    __metadata("design:paramtypes", [Object])
], NodeHTTPAPICallExecutorAgentBuilder);
export { NodeHTTPAPICallExecutorAgentBuilder };
