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
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { inject, injectable } from 'inversify';
import { NotAvailableError } from '../../error/index.js';
import { WordingManager } from '../../i18n/index.js';
import { UCBuilder, ucMountingPoint, } from '../../uc/index.js';
import { assertLoggerLevel, buildInputSchema, buildOutputSchema, init, } from './funcs.js';
import { RequestHandler } from './RequestHandler.js';
/**
 * A simple MCP Server implementation
 *
 * Although it implements {@link ServerManager}, this implementation is not necessarily a "server".
 * Indeed, it uses a local `Transport` so it must be considered the same as a {@link NodeCoreCLIManager}.
 * Therefore, it calls `execClient` and not `execServer`.
 * This way, Claude AI, or any other client is just a wrapper on top of it.
 */
let NodeLocalStdioMCPServerManager = class NodeLocalStdioMCPServerManager {
    requestHandler;
    productManifest;
    settingsManager;
    ucBuilder;
    ucManager;
    wordingManager;
    runtime;
    transport;
    constructor(requestHandler, productManifest, settingsManager, ucBuilder, ucManager, wordingManager) {
        this.requestHandler = requestHandler;
        this.productManifest = productManifest;
        this.settingsManager = settingsManager;
        this.ucBuilder = ucBuilder;
        this.ucManager = ucManager;
        this.wordingManager = wordingManager;
    }
    s() {
        return {
            logger_level: this.settingsManager.get()('logger_level'),
        };
    }
    overrideUCManager(ucManager) {
        this.ucManager = ucManager;
    }
    async init() {
        this.initCommon();
    }
    initSync() {
        this.initCommon();
    }
    async mount(appManifest, ucd, contract) {
        this.mountCommon(appManifest, ucd, contract);
    }
    mountSync(appManifest, ucd, contract) {
        this.mountCommon(appManifest, ucd, contract);
    }
    async mountOpenAPISpec(_spec, _at) {
        // Nothing to do
    }
    async mountStaticDir(_dirPath) {
        throw new NotAvailableError('mountStaticDir');
    }
    async start() {
        this.transport = new StdioServerTransport();
        await this.runtime.connect(this.transport);
    }
    async stop() {
        await this.runtime.close();
        await this.transport.close();
    }
    async warmUp() {
        // Nothing to do
    }
    async execRequest(appManifest, ucd, toolInput) {
        return this.requestHandler.exec({
            appManifest,
            toolInput,
            ucd,
            ucManager: this.ucManager,
        });
    }
    initCommon() {
        this.runtime = init(this.productManifest);
        assertLoggerLevel(this.s().logger_level);
    }
    mountCommon(appManifest, ucd, _contract) {
        const uc = this.ucBuilder.exec({
            appManifest,
            auth: null,
            def: ucd,
        });
        const inputSchema = buildInputSchema(uc);
        const outputSchema = buildOutputSchema(uc);
        const mountingPoint = uc.def.ext?.cmd?.mountAt ?? ucMountingPoint(uc);
        const { desc, label } = this.wordingManager.uc(uc.def);
        const config = {
            annotations: {
                destructiveHint: ucd.metadata.sensitive,
            },
            inputSchema,
            outputSchema,
            title: label,
        };
        if (desc) {
            config.description = desc;
        }
        this.runtime.registerTool(mountingPoint, config, (input) => this.execRequest(appManifest, ucd, input));
    }
};
NodeLocalStdioMCPServerManager = __decorate([
    injectable(),
    __param(0, inject(RequestHandler)),
    __param(1, inject('ProductManifest')),
    __param(2, inject('SettingsManager')),
    __param(3, inject(UCBuilder)),
    __param(4, inject('UCManager')),
    __param(5, inject(WordingManager)),
    __metadata("design:paramtypes", [RequestHandler, Object, Object, UCBuilder, Object, WordingManager])
], NodeLocalStdioMCPServerManager);
export { NodeLocalStdioMCPServerManager };
