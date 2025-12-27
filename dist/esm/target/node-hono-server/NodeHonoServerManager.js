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
import { createAdaptorServer } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { inject, injectable } from 'inversify';
import { NotCallableError } from '../../error/index.js';
import { CustomerFacingErrorBuilder } from '../lib/server/CustomerFacingErrorBuilder.js';
import { EntrypointsBuilder } from '../lib/server/EntrypointsBuilder.js';
import { ServerRequestHandler } from '../lib/server/ServerRequestHandler.js';
import { ServerSSLCertLoader } from '../lib/server/ServerSSLCertLoader.js';
import { buildHandler, init, mountHandler } from '../lib/server-hono/funcs.js';
import { listen, stop } from '../lib/server-node/funcs.js';
let NodeHonoServerManager = class NodeHonoServerManager {
    customerFacingErrorBuilder;
    entrypointsBuilder;
    environmentManager;
    logger;
    serverRequestHandler;
    serverSSLCertLoader;
    settingsManager;
    ucManager;
    runtime;
    server;
    constructor(customerFacingErrorBuilder, entrypointsBuilder, environmentManager, logger, serverRequestHandler, serverSSLCertLoader, settingsManager, ucManager) {
        this.customerFacingErrorBuilder = customerFacingErrorBuilder;
        this.entrypointsBuilder = entrypointsBuilder;
        this.environmentManager = environmentManager;
        this.logger = logger;
        this.serverRequestHandler = serverRequestHandler;
        this.serverSSLCertLoader = serverSSLCertLoader;
        this.settingsManager = settingsManager;
        this.ucManager = ucManager;
    }
    s() {
        return {
            server_binding_host: this.settingsManager.get()('server_binding_host'),
            server_binding_port: this.settingsManager.get()('server_binding_port'),
            server_stop_mode: this.settingsManager.get()('server_stop_mode'),
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
        this.runtime = init(this.customerFacingErrorBuilder);
        await this.createServer();
    }
    initSync() {
        throw new NotCallableError('initSync', 'init', 'async-only');
    }
    async mount(appManifest, ucd, contract) {
        this.mountCommon(appManifest, ucd, contract);
    }
    mountSync(appManifest, ucd, contract) {
        this.mountCommon(appManifest, ucd, contract);
    }
    async mountStaticDir(dirPath) {
        this.runtime.use(serveStatic({ root: dirPath }));
    }
    async start() {
        listen(this.server, this.entrypointsBuilder, this.logger, this.settingsManager);
    }
    async stop() {
        await stop(this.server, this.settingsManager);
    }
    async warmUp() {
        // Nothing to do
    }
    async createServer() {
        const host = this.s().server_binding_host;
        const port = this.s().server_binding_port;
        const opts = {
            fetch: this.runtime.fetch,
            hostname: host,
            port,
        };
        if (port !== 443) {
            this.logger.info('Creating HTTP server', { port });
            opts.createServer = http.createServer;
            this.server = createAdaptorServer(opts);
            return;
        }
        this.logger.info('Creating HTTPS server', { port });
        opts.createServer = https.createServer;
        opts.serverOptions = await this.serverSSLCertLoader.exec(undefined);
        this.server = createAdaptorServer(opts);
    }
    mountCommon(appManifest, ucd, contract) {
        mountHandler(contract, this.runtime, buildHandler(appManifest, ucd, contract, this.serverRequestHandler, this.ucManager));
    }
};
NodeHonoServerManager = __decorate([
    injectable(),
    __param(0, inject(CustomerFacingErrorBuilder)),
    __param(1, inject(EntrypointsBuilder)),
    __param(2, inject('EnvironmentManager')),
    __param(3, inject('Logger')),
    __param(4, inject(ServerRequestHandler)),
    __param(5, inject(ServerSSLCertLoader)),
    __param(6, inject('SettingsManager')),
    __param(7, inject('UCManager')),
    __metadata("design:paramtypes", [CustomerFacingErrorBuilder,
        EntrypointsBuilder, Object, Object, ServerRequestHandler,
        ServerSSLCertLoader, Object, Object])
], NodeHonoServerManager);
export { NodeHonoServerManager };
