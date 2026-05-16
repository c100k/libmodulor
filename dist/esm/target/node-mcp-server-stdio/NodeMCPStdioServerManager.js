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
import { WordingManager } from '../../i18n/index.js';
import { UCBuilder, } from '../../uc/index.js';
import { init, toolConfig } from '../lib/mcp-server/funcs.js';
import { assertLoggerLevel } from '../lib/mcp-server/stdio/funcs.js';
import { MCPStdioRequestHandler } from '../lib/mcp-server/stdio/MCPStdioRequestHandler.js';
let NodeMCPStdioServerManager = class NodeMCPStdioServerManager {
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
    async mountMCP(_ucs, _at) {
        // Nothing to do
    }
    async mountOpenAPISpec(_spec, _at) {
        // Nothing to do
    }
    async mountStaticDir(_dirPath) {
        // Nothing to do
    }
    async start() {
        await this.runtime.connect(this.transport);
    }
    async stop() {
        await this.runtime.close();
        await this.transport.close();
    }
    async warmUp() {
        // Nothing to do
    }
    initCommon() {
        this.runtime = init(this.productManifest);
        assertLoggerLevel(this.s().logger_level);
        this.transport = new StdioServerTransport();
    }
    mountCommon(appManifest, ucd, contract) {
        const uc = this.ucBuilder.exec({
            appManifest,
            auth: null,
            def: ucd,
        });
        const mountingPoint = uc.def.ext?.cmd?.mountAt ?? contract.mountingPoint;
        const wording = this.wordingManager.uc(uc.def);
        const config = toolConfig(uc, 'client', wording);
        this.runtime.registerTool(mountingPoint, config, (toolInput) => this.requestHandler.exec({
            appManifest,
            toolInput,
            ucd,
            ucManager: this.ucManager,
        }));
    }
};
NodeMCPStdioServerManager = __decorate([
    injectable(),
    __param(0, inject(MCPStdioRequestHandler)),
    __param(1, inject('ProductManifest')),
    __param(2, inject('SettingsManager')),
    __param(3, inject(UCBuilder)),
    __param(4, inject('UCManager')),
    __param(5, inject(WordingManager)),
    __metadata("design:paramtypes", [MCPStdioRequestHandler, Object, Object, UCBuilder, Object, WordingManager])
], NodeMCPStdioServerManager);
export { NodeMCPStdioServerManager };
