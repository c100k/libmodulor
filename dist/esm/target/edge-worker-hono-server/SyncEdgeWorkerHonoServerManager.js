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
import { CustomerFacingErrorBuilder } from '../lib/server/CustomerFacingErrorBuilder.js';
import { ServerRequestHandler } from '../lib/server/ServerRequestHandler.js';
import { buildHandler, init, mountHandler } from '../lib/server-hono/funcs.js';
let SyncEdgeWorkerHonoServerManager = class SyncEdgeWorkerHonoServerManager {
    customerFacingErrorBuilder;
    serverRequestHandler;
    settingsManager;
    ucDataStore;
    ucManager;
    runtime;
    constructor(customerFacingErrorBuilder, serverRequestHandler, settingsManager, ucDataStore, ucManager) {
        this.customerFacingErrorBuilder = customerFacingErrorBuilder;
        this.serverRequestHandler = serverRequestHandler;
        this.settingsManager = settingsManager;
        this.ucDataStore = ucDataStore;
        this.ucManager = ucManager;
    }
    s() {
        return {
            sewhsm_bindings_uc_data_store: this.settingsManager.get()('sewhsm_bindings_uc_data_store'),
        };
    }
    getRuntime() {
        return this.runtime;
    }
    overrideUCManager(ucManager) {
        this.ucManager = ucManager;
    }
    async init() {
        throw new NotCallableError('init', 'initSync', 'sync-only');
    }
    initSync() {
        this.runtime = init(this.customerFacingErrorBuilder);
    }
    async mount(_appManifest, _ucd, _contract) {
        throw new NotCallableError('mount', 'mountSync', 'sync-only');
    }
    mountSync(appManifest, ucd, contract) {
        mountHandler(contract, this.runtime, buildHandler(appManifest, ucd, contract, this.serverRequestHandler, this.ucManager, (c) => this.beforeExec(c)));
    }
    async mountStaticDir(_dirPath) {
        throw new NotAvailableError('mountStaticDir');
    }
    async start() {
        throw new NotAvailableError('start');
    }
    async stop() {
        throw new NotAvailableError('stop');
    }
    async warmUp() {
        throw new NotAvailableError('warmUp');
    }
    async beforeExec(c) {
        const { env } = c;
        if (!env) {
            return;
        }
        const ucDataStoreBinding = this.s().sewhsm_bindings_uc_data_store;
        if (!ucDataStoreBinding ||
            !(ucDataStoreBinding in env) ||
            !('setClient' in this.ucDataStore) ||
            typeof this.ucDataStore.setClient !== 'function') {
            return;
        }
        this.ucDataStore.setClient(env[ucDataStoreBinding]);
    }
};
SyncEdgeWorkerHonoServerManager = __decorate([
    injectable(),
    __param(0, inject(CustomerFacingErrorBuilder)),
    __param(1, inject(ServerRequestHandler)),
    __param(2, inject('SettingsManager')),
    __param(3, inject('UCDataStore')),
    __param(4, inject('UCManager')),
    __metadata("design:paramtypes", [CustomerFacingErrorBuilder,
        ServerRequestHandler, Object, Object, Object])
], SyncEdgeWorkerHonoServerManager);
export { SyncEdgeWorkerHonoServerManager };
