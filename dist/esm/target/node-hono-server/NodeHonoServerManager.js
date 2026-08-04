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
import { CORSMiddlewareBuilder } from '../lib/server-hono/CORSMiddlewareBuilder.js';
import { buildHandler, init, mountHandler } from '../lib/server-hono/funcs.js';
import { listen, stop } from '../lib/server-node/funcs.js';
let NodeHonoServerManager = class NodeHonoServerManager {
    corsMiddlewareBuilder;
    customerFacingErrorBuilder;
    entrypointsBuilder;
    logger;
    mcpHTTPRequestHandlerBuilder;
    serverRequestHandler;
    serverSSLCertLoader;
    settingsManager;
    ucManager;
    hono;
    server;
    constructor(corsMiddlewareBuilder, customerFacingErrorBuilder, entrypointsBuilder, logger, mcpHTTPRequestHandlerBuilder, serverRequestHandler, serverSSLCertLoader, settingsManager, ucManager) {
        this.corsMiddlewareBuilder = corsMiddlewareBuilder;
        this.customerFacingErrorBuilder = customerFacingErrorBuilder;
        this.entrypointsBuilder = entrypointsBuilder;
        this.logger = logger;
        this.mcpHTTPRequestHandlerBuilder = mcpHTTPRequestHandlerBuilder;
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
    overrideUCManager(ucManager) {
        this.ucManager = ucManager;
    }
    async init() {
        this.hono = init(this.corsMiddlewareBuilder, this.customerFacingErrorBuilder);
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
    async mountMCP(ucs, at) {
        this.hono.post(at, this.mcpHTTPRequestHandlerBuilder.exec({
            ucManager: this.ucManager,
            ucs,
        }));
    }
    async mountOpenAPISpec(spec, at) {
        this.hono.get(at, (c) => {
            return c.json(spec);
        });
    }
    async mountStaticDir(dirPath) {
        this.hono.use(serveStatic({ root: dirPath }));
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
            fetch: this.hono.fetch,
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
        opts.serverOptions = await this.serverSSLCertLoader.exec({});
        this.server = createAdaptorServer(opts);
    }
    mountCommon(appManifest, ucd, contract) {
        mountHandler(contract, this.hono, buildHandler(appManifest, ucd, contract, this.serverRequestHandler, this.ucManager));
    }
};
NodeHonoServerManager = __decorate([
    injectable(),
    __param(0, inject(CORSMiddlewareBuilder)),
    __param(1, inject(CustomerFacingErrorBuilder)),
    __param(2, inject(EntrypointsBuilder)),
    __param(3, inject('Logger')),
    __param(4, inject('MCPHTTPRequestHandlerBuilder')),
    __param(5, inject(ServerRequestHandler)),
    __param(6, inject(ServerSSLCertLoader)),
    __param(7, inject('SettingsManager')),
    __param(8, inject('UCManager')),
    __metadata("design:paramtypes", [CORSMiddlewareBuilder,
        CustomerFacingErrorBuilder,
        EntrypointsBuilder, Object, Object, ServerRequestHandler,
        ServerSSLCertLoader, Object, Object])
], NodeHonoServerManager);
export { NodeHonoServerManager };
