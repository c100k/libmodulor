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
import { load } from '@grpc/proto-loader';
import { ReflectionService } from '@grpc/reflection';
import { inject, injectable } from 'inversify';
import { protoFile } from '../protobuf/proto.js';
import { addAllTo, root } from '../protobuf/root.js';
import { service, serviceMethod, serviceTypes } from '../protobuf/service.js';
import { buildHandler } from './funcs.js';
import { ServerRequestHandler } from './ServerRequestHandler.js';
import { serviceDefinition } from './service-def.js';
let ServiceManager = class ServiceManager {
    fsManager;
    fileMetadataManager;
    logger;
    serverRequestHandler;
    settingsManager;
    root;
    services;
    constructor(fsManager, fileMetadataManager, logger, serverRequestHandler, settingsManager) {
        this.fsManager = fsManager;
        this.fileMetadataManager = fileMetadataManager;
        this.logger = logger;
        this.serverRequestHandler = serverRequestHandler;
        this.settingsManager = settingsManager;
        this.root = root();
        this.services = new Map();
    }
    s() {
        return {
            server_grpc_expose_reflection: this.settingsManager.get()('server_grpc_expose_reflection'),
            server_tmp_path: this.settingsManager.get()('server_tmp_path'),
        };
    }
    async addServices(server) {
        for (const [_name, { service, impl }] of this.services) {
            this.logger.info('Registering gRPC service : %s', service.name);
            server.addService(serviceDefinition(this.root, service), impl);
        }
    }
    async exposeReflection(server) {
        if (!this.s().server_grpc_expose_reflection) {
            return;
        }
        this.logger.info('Exposing reflection');
        const proto = protoFile(this.root, this.services);
        const protoPath = this.fsManager.path(this.s().server_tmp_path, 'service.proto');
        await this.fsManager.touch(protoPath, proto);
        const pkg = await load(protoPath);
        const reflection = new ReflectionService(pkg);
        reflection.addToServer(server);
    }
    mount(ucManager, appManifest, ucd, contract) {
        let s = this.services.get(appManifest.name);
        if (!s) {
            s = { impl: {}, service: service(appManifest.name) };
            this.services.set(appManifest.name, s);
        }
        const types = serviceTypes(ucd);
        const method = serviceMethod(ucd, types, contract);
        s.service.add(method);
        addAllTo(this.root, types);
        s.impl[ucd.metadata.name] = buildHandler(appManifest, ucd, this.fileMetadataManager, this.serverRequestHandler, ucManager);
    }
};
ServiceManager = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __param(1, inject('FileMetadataManager')),
    __param(2, inject('Logger')),
    __param(3, inject(ServerRequestHandler)),
    __param(4, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object, Object, Object, ServerRequestHandler, Object])
], ServiceManager);
export { ServiceManager };
