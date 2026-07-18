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
import { NotCallableError, NotFoundError, NotImplementedError, } from '../../error/index.js';
import { CustomerFacingErrorBuilder } from '../lib/server/CustomerFacingErrorBuilder.js';
import { EntrypointsBuilder } from '../lib/server/EntrypointsBuilder.js';
import { ServerRequestHandler } from '../lib/server/ServerRequestHandler.js';
import { listen, stop } from '../lib/server-node/funcs.js';
import { NodeHTTPServerCreator } from '../lib/server-node/NodeHTTPServerCreator.js';
import { DEFAULT_RES_HEADERS } from '../lib/server-node-core/consts.js';
import { assertIncomingMessageEnhanced, buildHandler, buildRes, enhanceIncomingMessage, init, mountHandler, routeKey, } from '../lib/server-node-core/funcs.js';
let NodeCoreHTTPServerManager = class NodeCoreHTTPServerManager {
    customerFacingErrorBuilder;
    entrypointsBuilder;
    environmentManager;
    logger;
    nodeHTTPServerCreator;
    serverRequestHandler;
    settingsManager;
    ucManager;
    runtime;
    router;
    constructor(customerFacingErrorBuilder, entrypointsBuilder, environmentManager, logger, nodeHTTPServerCreator, serverRequestHandler, settingsManager, ucManager) {
        this.customerFacingErrorBuilder = customerFacingErrorBuilder;
        this.entrypointsBuilder = entrypointsBuilder;
        this.environmentManager = environmentManager;
        this.logger = logger;
        this.nodeHTTPServerCreator = nodeHTTPServerCreator;
        this.serverRequestHandler = serverRequestHandler;
        this.settingsManager = settingsManager;
        this.ucManager = ucManager;
        this.router = {};
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
        init();
        const { server } = await this.nodeHTTPServerCreator.exec({});
        this.runtime = server;
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
    async mountMCP(_ucs, _at) {
        throw new NotImplementedError('mountMCP');
    }
    async mountOpenAPISpec(_spec, _at) {
        throw new NotImplementedError('mountOpenAPISpec');
    }
    async mountStaticDir(_dirPath) {
        throw new NotImplementedError('mountStaticDir');
    }
    async start() {
        listen(this.runtime, this.entrypointsBuilder, this.logger, this.settingsManager);
    }
    async stop() {
        await stop(this.runtime, this.settingsManager);
    }
    async warmUp() {
        this.runtime.on('request', this.mainListener());
    }
    mainListener() {
        return async (req, res) => {
            try {
                await enhanceIncomingMessage(req);
                assertIncomingMessageEnhanced(req);
                const method = req.method;
                const path = req.fullURL?.pathname;
                if (!method || !path) {
                    res.writeHead(404, DEFAULT_RES_HEADERS).end(buildRes(new NotFoundError()));
                    return;
                }
                const key = routeKey(method.toLocaleUpperCase(), path);
                const route = this.router[key];
                if (!route) {
                    res.writeHead(404, DEFAULT_RES_HEADERS).end(buildRes(new NotFoundError()));
                    return;
                }
                route(req, res);
            }
            catch (err) {
                const { error } = this.customerFacingErrorBuilder.exec({
                    error: err,
                });
                res.writeHead(error.httpStatus, DEFAULT_RES_HEADERS).end(buildRes(error));
            }
        };
    }
    mountCommon(appManifest, ucd, contract) {
        mountHandler(contract, this.router, buildHandler(appManifest, ucd, contract, this.serverRequestHandler, this.ucManager));
    }
};
NodeCoreHTTPServerManager = __decorate([
    injectable(),
    __param(0, inject(CustomerFacingErrorBuilder)),
    __param(1, inject(EntrypointsBuilder)),
    __param(2, inject('EnvironmentManager')),
    __param(3, inject('Logger')),
    __param(4, inject(NodeHTTPServerCreator)),
    __param(5, inject(ServerRequestHandler)),
    __param(6, inject('SettingsManager')),
    __param(7, inject('UCManager')),
    __metadata("design:paramtypes", [CustomerFacingErrorBuilder,
        EntrypointsBuilder, Object, Object, NodeHTTPServerCreator,
        ServerRequestHandler, Object, Object])
], NodeCoreHTTPServerManager);
export { NodeCoreHTTPServerManager };
