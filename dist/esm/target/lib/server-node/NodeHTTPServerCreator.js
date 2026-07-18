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
import http, {} from 'node:http';
import https from 'node:https';
import { inject, injectable } from 'inversify';
import { ServerSSLCertLoader } from '../server/ServerSSLCertLoader.js';
let NodeHTTPServerCreator = class NodeHTTPServerCreator {
    logger;
    serverSSLCertLoader;
    settingsManager;
    constructor(logger, serverSSLCertLoader, settingsManager) {
        this.logger = logger;
        this.serverSSLCertLoader = serverSSLCertLoader;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            server_binding_port: this.settingsManager.get()('server_binding_port'),
        };
    }
    async exec({ listener }) {
        const port = this.s().server_binding_port;
        let server;
        if (port !== 443) {
            this.logger.info('Creating HTTP server', { port });
            server = http.createServer(listener);
        }
        else {
            this.logger.info('Creating HTTPS server', { port });
            const credentials = await this.serverSSLCertLoader.exec({});
            server = https.createServer(credentials, listener);
        }
        return {
            server,
        };
    }
};
NodeHTTPServerCreator = __decorate([
    injectable(),
    __param(0, inject('Logger')),
    __param(1, inject(ServerSSLCertLoader)),
    __param(2, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object, ServerSSLCertLoader, Object])
], NodeHTTPServerCreator);
export { NodeHTTPServerCreator };
