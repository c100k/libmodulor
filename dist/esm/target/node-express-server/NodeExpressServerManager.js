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
import express, {} from 'express';
import { inject, injectable } from 'inversify';
import { NotCallableError } from '../../error/index.js';
import { EntrypointsBuilder } from '../lib/server/EntrypointsBuilder.js';
import { ServerRequestHandler } from '../lib/server/ServerRequestHandler.js';
import { ServerSSLCertLoader } from '../lib/server/ServerSSLCertLoader.js';
import { buildHandler, init, mountHandler, } from '../lib/server-express/funcs.js';
import { HelmetMiddlewareBuilder } from '../lib/server-express/HelmetMiddlewareBuilder.js';
import { listen, stop } from '../lib/server-node/funcs.js';
let NodeExpressServerManager = class NodeExpressServerManager {
    entrypointsBuilder;
    environmentManager;
    helmetMB;
    logger;
    serverRequestHandler;
    serverSSLCertLoader;
    settingsManager;
    ucManager;
    runtime;
    server;
    constructor(entrypointsBuilder, environmentManager, helmetMB, logger, serverRequestHandler, serverSSLCertLoader, settingsManager, ucManager) {
        this.entrypointsBuilder = entrypointsBuilder;
        this.environmentManager = environmentManager;
        this.helmetMB = helmetMB;
        this.logger = logger;
        this.serverRequestHandler = serverRequestHandler;
        this.serverSSLCertLoader = serverSSLCertLoader;
        this.settingsManager = settingsManager;
        this.ucManager = ucManager;
    }
    s() {
        return {
            logger_level: this.settingsManager.get()('logger_level'),
            server_binding_host: this.settingsManager.get()('server_binding_host'),
            server_binding_port: this.settingsManager.get()('server_binding_port'),
            server_tmp_path: this.settingsManager.get()('server_tmp_path'),
        };
    }
    getRuntime() {
        if (this.environmentManager.isProd()) {
            throw new Error('Do not use getRuntime() in production !');
        }
        return this.runtime;
    }
    overrideUCManager(ucManager) {
        this.ucManager = ucManager;
    }
    async init() {
        this.runtime = init(this.helmetMB, this.s().logger_level, this.s().server_tmp_path);
        await this.createServer();
    }
    initSync() {
        throw new NotCallableError('initSync', 'init', 'async-only');
    }
    async mount(appManifest, ucd, contract) {
        const handler = buildHandler(appManifest, ucd, contract, this.serverRequestHandler, this.ucManager);
        mountHandler(contract, this.runtime, handler);
    }
    async mountStaticDir(dirPath) {
        this.runtime.use(express.static(dirPath));
    }
    async start() {
        listen(this.server, this.entrypointsBuilder, this.logger, this.settingsManager);
    }
    async stop() {
        await stop(this.server);
    }
    async warmUp() {
        // Nothing to do
    }
    async createServer() {
        const port = this.s().server_binding_port;
        if (port !== 443) {
            this.logger.info('Creating HTTP server', { port });
            this.server = http.createServer(this.runtime);
            return;
        }
        this.logger.info('Creating HTTPS server', { port });
        const credentials = await this.serverSSLCertLoader.exec(undefined);
        this.server = https.createServer(credentials, this.runtime);
    }
};
NodeExpressServerManager = __decorate([
    injectable(),
    __param(0, inject(EntrypointsBuilder)),
    __param(1, inject('EnvironmentManager')),
    __param(2, inject(HelmetMiddlewareBuilder)),
    __param(3, inject('Logger')),
    __param(4, inject(ServerRequestHandler)),
    __param(5, inject(ServerSSLCertLoader)),
    __param(6, inject('SettingsManager')),
    __param(7, inject('UCManager')),
    __metadata("design:paramtypes", [EntrypointsBuilder, Object, HelmetMiddlewareBuilder, Object, ServerRequestHandler,
        ServerSSLCertLoader, Object, Object])
], NodeExpressServerManager);
export { NodeExpressServerManager };
