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
import { ForbiddenError } from '../../error/index.js';
import { UCExecMode } from '../exec.js';
import { UCOutputReader } from '../helpers/UCOutputReader.js';
import { rInput } from '../utils/rInput.js';
import { UCExecChecker } from '../workers/UCExecChecker.js';
import { UCInputFilesProcessor } from '../workers/UCInputFilesProcessor.js';
import { UCInputValidator } from '../workers/UCInputValidator.js';
let SimpleUCManager = class SimpleUCManager {
    ucClientConfirmManager;
    clockManager;
    cryptoManager;
    logger;
    ucDataStore;
    ucExecChecker;
    ucInputFilesProcessor;
    ucInputValidator;
    ucInitProvider;
    ucMainProvider;
    // WARNING : This property makes this class "thread unsafe". Be careful how you inject it into your components.
    tx;
    constructor(ucClientConfirmManager, clockManager, cryptoManager, logger, ucDataStore, ucExecChecker, ucInputFilesProcessor, ucInputValidator, ucInitProvider, ucMainProvider) {
        this.ucClientConfirmManager = ucClientConfirmManager;
        this.clockManager = clockManager;
        this.cryptoManager = cryptoManager;
        this.logger = logger;
        this.ucDataStore = ucDataStore;
        this.ucExecChecker = ucExecChecker;
        this.ucInputFilesProcessor = ucInputFilesProcessor;
        this.ucInputValidator = ucInputValidator;
        this.ucInitProvider = ucInitProvider;
        this.ucMainProvider = ucMainProvider;
        this.tx = undefined;
    }
    async commitTx() {
        if (!this.tx) {
            throw new Error('The tx is not defined, therefore it cannot be committed');
        }
        await this.tx.ref.commit();
        this.tx = undefined;
    }
    async confirmClient(uc) {
        const { def } = uc;
        const { metadata: { sensitive }, } = def;
        if (!sensitive) {
            return true;
        }
        return this.ucClientConfirmManager.exec(def);
    }
    async execClient(uc) {
        const { lifecycle, metadata } = uc.def;
        const { client, server } = lifecycle;
        if (!client) {
            throw new Error(`The use case ${metadata.name} has no client lifecycle`);
        }
        // Always check the right to execute, even if done when displaying the control
        const { allowed } = await this.ucExecChecker.exec({
            lifecycle: 'client',
            uc,
        });
        if (!allowed) {
            throw new ForbiddenError();
        }
        this.ucInputValidator.exec({ uc });
        // Process the file client side only if it is not sent to the server
        // Be careful with some edge cases where the file needs to be uploaded somewhere else.
        // Note that we cannot check server !== true because in some cases, the server is not stripped (e.g. tests, node cli client, etc.).
        if (server === undefined) {
            await this.ucInputFilesProcessor.exec({ uc });
        }
        const main = (await this.ucMainProvider(client.main));
        const output = await main.exec({ uc });
        return new UCOutputReader(uc.def, output ?? undefined);
    }
    async execServer(uc) {
        const { lifecycle, metadata } = uc.def;
        const { server } = lifecycle;
        if (typeof server !== 'object') {
            throw new Error(`The use case ${metadata.name} has no server lifecycle`);
        }
        // Always check the right to execute, even if done when displaying the control
        const { allowed } = await this.ucExecChecker.exec({
            lifecycle: 'server',
            uc,
        });
        if (!allowed) {
            throw new ForbiddenError();
        }
        this.ucInputValidator.exec({ uc });
        await this.ucInputFilesProcessor.exec({ uc });
        const main = (await this.ucMainProvider(server.main));
        return main.exec({ uc });
    }
    async initServer(uc) {
        const { lifecycle, metadata } = uc.def;
        const { server } = lifecycle;
        if (typeof server !== 'object') {
            return;
        }
        if (!server.init) {
            return;
        }
        this.logger.info('Initializing ucd', { name: metadata.name });
        const init = (await this.ucInitProvider(server.init));
        await init.exec();
    }
    async startTx() {
        this.tx = {
            ref: await this.ucDataStore.startTx(),
        };
    }
    async persist(uc, data, opts) {
        const record = {
            aggregateId: opts?.aggregateId || this.cryptoManager.randomUUID(),
            appName: uc.appManifest.name,
            createdAt: this.clockManager.now(),
            data: data || null,
            executionMode: opts?.executionMode || UCExecMode.USER,
            id: this.cryptoManager.randomUUID(),
            input: rInput(uc, { ignoreTransient: true }),
            name: uc.def.metadata.name,
            organizationId: opts?.organizationId || uc.auth?.organization.id || null,
            userId: uc.auth?.user.id || null,
        };
        await this.ucDataStore.write(record, { tx: this.tx });
        return record;
    }
    async persistProjection(name, data) {
        return this.ucDataStore.writeProjection(name, data, {
            tx: this.tx,
        });
    }
    async rollbackTx() {
        if (!this.tx) {
            throw new Error('The tx is not defined, therefore it cannot be rollbacked');
        }
        await this.tx.ref.rollback();
        this.tx = undefined;
    }
};
SimpleUCManager = __decorate([
    injectable(),
    __param(0, inject('UCClientConfirmManager')),
    __param(1, inject('ClockManager')),
    __param(2, inject('CryptoManager')),
    __param(3, inject('Logger')),
    __param(4, inject('UCDataStore')),
    __param(5, inject(UCExecChecker)),
    __param(6, inject(UCInputFilesProcessor)),
    __param(7, inject(UCInputValidator)),
    __param(8, inject('Provider<UCInit>')),
    __param(9, inject('Provider<UCMain>')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, UCExecChecker,
        UCInputFilesProcessor,
        UCInputValidator, Function, Function])
], SimpleUCManager);
export { SimpleUCManager };
