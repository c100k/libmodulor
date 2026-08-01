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
import { NotAvailableError, NotCallableError } from '../../error/index.js';
import { EntrypointsBuilder } from '../lib/server/EntrypointsBuilder.js';
import { init, listen, stop } from '../lib/server-grpc/funcs.js';
import { ServerCredentialsCreator } from '../lib/server-grpc/ServerCredentialsCreator.js';
import { ServiceManager } from '../lib/server-grpc/ServiceManager.js';
let NodeGRPCServerManager = class NodeGRPCServerManager {
    entrypointsBuilder;
    environmentManager;
    serverCredentialsCreator;
    logger;
    settingsManager;
    ucManager;
    serviceManager;
    server;
    constructor(entrypointsBuilder, environmentManager, serverCredentialsCreator, logger, settingsManager, ucManager, serviceManager) {
        this.entrypointsBuilder = entrypointsBuilder;
        this.environmentManager = environmentManager;
        this.serverCredentialsCreator = serverCredentialsCreator;
        this.logger = logger;
        this.settingsManager = settingsManager;
        this.ucManager = ucManager;
        this.serviceManager = serviceManager;
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
        return this.server;
    }
    overrideUCManager(ucManager) {
        this.ucManager = ucManager;
    }
    async init() {
        this.server = init();
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
        throw new NotAvailableError('mountMCP');
    }
    async mountOpenAPISpec(_spec, _at) {
        throw new NotAvailableError('mountOpenAPISpec');
    }
    async mountStaticDir(_dirPath) {
        throw new NotAvailableError('mountStaticDir');
    }
    async start() {
        const { creds } = await this.serverCredentialsCreator.exec({});
        listen(this.server, creds, this.entrypointsBuilder, this.logger);
    }
    async stop() {
        await stop(this.server, this.settingsManager);
    }
    async warmUp() {
        await this.serviceManager.addServices(this.server);
        await this.serviceManager.exposeReflection(this.server);
    }
    mountCommon(appManifest, ucd, contract) {
        this.serviceManager.mount(this.ucManager, appManifest, ucd, contract);
    }
};
NodeGRPCServerManager = __decorate([
    injectable(),
    __param(0, inject(EntrypointsBuilder)),
    __param(1, inject('EnvironmentManager')),
    __param(2, inject(ServerCredentialsCreator)),
    __param(3, inject('Logger')),
    __param(4, inject('SettingsManager')),
    __param(5, inject('UCManager')),
    __param(6, inject(ServiceManager)),
    __metadata("design:paramtypes", [EntrypointsBuilder, Object, ServerCredentialsCreator, Object, Object, Object, ServiceManager])
], NodeGRPCServerManager);
export { NodeGRPCServerManager };
