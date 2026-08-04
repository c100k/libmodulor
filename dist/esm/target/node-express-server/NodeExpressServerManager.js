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
import express, {} from 'express';
import { inject, injectable } from 'inversify';
import { NotCallableError } from '../../error/index.js';
import { CustomerFacingErrorBuilder } from '../lib/server/CustomerFacingErrorBuilder.js';
import { EntrypointsBuilder } from '../lib/server/EntrypointsBuilder.js';
import { ServerRequestHandler } from '../lib/server/ServerRequestHandler.js';
import { CORSMiddlewareBuilder } from '../lib/server-express/CORSMiddlewareBuilder.js';
import { buildHandler, init, mountHandler, postInit, } from '../lib/server-express/funcs.js';
import { HelmetMiddlewareBuilder } from '../lib/server-express/HelmetMiddlewareBuilder.js';
import { listen, stop } from '../lib/server-node/funcs.js';
import { NodeHTTPServerCreator } from '../lib/server-node/NodeHTTPServerCreator.js';
let NodeExpressServerManager = class NodeExpressServerManager {
    corsMiddlewareBuilder;
    customerFacingErrorBuilder;
    entrypointsBuilder;
    helmetMiddlewareBuilder;
    logger;
    nodeHTTPServerCreator;
    mcpHTTPRequestHandlerBuilder;
    serverRequestHandler;
    settingsManager;
    ucManager;
    express;
    server;
    constructor(corsMiddlewareBuilder, customerFacingErrorBuilder, entrypointsBuilder, helmetMiddlewareBuilder, logger, nodeHTTPServerCreator, mcpHTTPRequestHandlerBuilder, serverRequestHandler, settingsManager, ucManager) {
        this.corsMiddlewareBuilder = corsMiddlewareBuilder;
        this.customerFacingErrorBuilder = customerFacingErrorBuilder;
        this.entrypointsBuilder = entrypointsBuilder;
        this.helmetMiddlewareBuilder = helmetMiddlewareBuilder;
        this.logger = logger;
        this.nodeHTTPServerCreator = nodeHTTPServerCreator;
        this.mcpHTTPRequestHandlerBuilder = mcpHTTPRequestHandlerBuilder;
        this.serverRequestHandler = serverRequestHandler;
        this.settingsManager = settingsManager;
        this.ucManager = ucManager;
    }
    s() {
        return {
            logger_level: this.settingsManager.get()('logger_level'),
            server_binding_host: this.settingsManager.get()('server_binding_host'),
            server_binding_port: this.settingsManager.get()('server_binding_port'),
            server_stop_mode: this.settingsManager.get()('server_stop_mode'),
            server_tmp_path: this.settingsManager.get()('server_tmp_path'),
        };
    }
    overrideUCManager(ucManager) {
        this.ucManager = ucManager;
    }
    async init() {
        this.express = init(this.corsMiddlewareBuilder, this.helmetMiddlewareBuilder, this.s().logger_level, this.s().server_tmp_path);
        const { server } = await this.nodeHTTPServerCreator.exec({
            listener: this.express,
        });
        this.server = server;
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
        this.express.post(at, this.mcpHTTPRequestHandlerBuilder.exec({
            ucManager: this.ucManager,
            ucs,
        }));
    }
    async mountOpenAPISpec(spec, at) {
        this.express.get(at, (_req, res) => {
            res.send(spec);
        });
    }
    async mountStaticDir(dirPath) {
        this.express.use(express.static(dirPath));
    }
    async start() {
        listen(this.server, this.entrypointsBuilder, this.logger, this.settingsManager);
    }
    async stop() {
        await stop(this.server, this.settingsManager);
    }
    async warmUp() {
        postInit(this.express, this.customerFacingErrorBuilder);
    }
    mountCommon(appManifest, ucd, contract) {
        mountHandler(contract, this.express, buildHandler(appManifest, ucd, contract, this.serverRequestHandler, this.ucManager));
    }
};
NodeExpressServerManager = __decorate([
    injectable(),
    __param(0, inject(CORSMiddlewareBuilder)),
    __param(1, inject(CustomerFacingErrorBuilder)),
    __param(2, inject(EntrypointsBuilder)),
    __param(3, inject(HelmetMiddlewareBuilder)),
    __param(4, inject('Logger')),
    __param(5, inject(NodeHTTPServerCreator)),
    __param(6, inject('MCPHTTPRequestHandlerBuilder')),
    __param(7, inject(ServerRequestHandler)),
    __param(8, inject('SettingsManager')),
    __param(9, inject('UCManager')),
    __metadata("design:paramtypes", [CORSMiddlewareBuilder,
        CustomerFacingErrorBuilder,
        EntrypointsBuilder,
        HelmetMiddlewareBuilder, Object, NodeHTTPServerCreator, Object, ServerRequestHandler, Object, Object])
], NodeExpressServerManager);
export { NodeExpressServerManager };
