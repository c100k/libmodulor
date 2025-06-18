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
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import { inject, injectable } from 'inversify';
import { NotAvailableError } from '../../error/index.js';
import { WordingManager } from '../../i18n/index.js';
import { UCBuilder, ucifIsMandatory, ucMountingPoint, } from '../../uc/index.js';
import { propertyType, resError, resObj } from './funcs.js';
/**
 * A simple MCP Server implementation
 *
 * Although it implements {@link ServerManager}, this implementation is not necessarily a "server".
 * Indeed, it uses a local `Transport` so it must be considered the same as a {@link NodeCoreCLIManager}.
 * Therefore, it calls `execClient` and not `execServer`.
 * This way, Claude AI, or any other client is just a wrapper on top of it.
 *
 * @alpha This implementation still has lots of TODOs and has not been tested in real conditions. It needs to be stabilized before usage.
 */
let NodeLocalStdioMCPServerManager = class NodeLocalStdioMCPServerManager {
    productManifest;
    settingsManager;
    ucBuilder;
    ucManager;
    wordingManager;
    runtime;
    transport;
    appManifests;
    tools;
    constructor(productManifest, settingsManager, ucBuilder, ucManager, wordingManager) {
        this.productManifest = productManifest;
        this.settingsManager = settingsManager;
        this.ucBuilder = ucBuilder;
        this.ucManager = ucManager;
        this.wordingManager = wordingManager;
        this.appManifests = new Map();
        this.tools = new Map();
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
        this.runtime.setRequestHandler(ListToolsRequestSchema, async () => {
            return {
                tools: [...this.tools.values().map((v) => v.tool)],
            };
        });
        this.runtime.setRequestHandler(CallToolRequestSchema, async (request) => this.execRequest(request));
    }
    buildInputSchema(uc) {
        const res = {
            type: 'object',
        };
        if (uc.inputFields.length > 0) {
            const properties = {};
            for (const f of uc.inputFields) {
                const { def, key } = f;
                const { desc } = this.wordingManager.ucif(f);
                properties[key] = {
                    ...propertyType(def),
                    description: desc,
                    required: ucifIsMandatory(def),
                };
            }
            res.properties = properties;
        }
        return res;
    }
    async execRequest(request) {
        const { name, arguments: args } = request.params;
        // TODO : Check authentication in some way (see if MCP handles it)
        const auth = null;
        try {
            const route = this.tools.get(name);
            if (!route) {
                throw new Error(`Unrecognized use case : ${name}`);
            }
            const { appName, ucd } = route;
            const appManifest = this.appManifests.get(appName);
            if (!appManifest) {
                throw new Error(`Unrecognized app : ${appName}`);
            }
            const uc = this.ucBuilder.exec({
                appManifest,
                auth,
                def: ucd,
            });
            if (args) {
                uc.fill(args);
            }
            const confirmed = await this.ucManager.confirmClient(uc);
            if (!confirmed) {
                throw new Error('Ask for the user to confirm');
            }
            const ucor = await this.ucManager.execClient(uc);
            return resObj(ucor);
        }
        catch (err) {
            return resError(err);
        }
    }
    initCommon() {
        this.runtime = new Server({
            name: this.productManifest.name,
            version: '0.1.0',
        }, {
            capabilities: {
                tools: {},
            },
        });
        if (this.s().logger_level !== 'error') {
            const message = 'Set the logging_level to "error" as MCP does not want the server to log to stdout (see https://modelcontextprotocol.io/docs/tools/debugging#implementing-logging)';
            // Depending on the `Logger` implementation, this.logger.error() might not write to stderr (e.g. can write to a file).
            // That's why we explicitly write to stdout by calling console.error().
            // biome-ignore lint/suspicious/noConsole: we want it
            console.error(new Error(message));
        }
    }
    mountCommon(appManifest, ucd, _contract) {
        const uc = this.ucBuilder.exec({
            appManifest,
            auth: null,
            def: ucd,
        });
        if (!this.appManifests.has(appManifest.name)) {
            this.appManifests.set(appManifest.name, appManifest);
        }
        const inputSchema = this.buildInputSchema(uc);
        const mountingPoint = uc.def.ext?.cmd?.mountAt ?? ucMountingPoint(uc);
        const tool = { inputSchema, name: mountingPoint };
        this.tools.set(mountingPoint, { appName: appManifest.name, tool, ucd });
    }
};
NodeLocalStdioMCPServerManager = __decorate([
    injectable(),
    __param(0, inject('ProductManifest')),
    __param(1, inject('SettingsManager')),
    __param(2, inject(UCBuilder)),
    __param(3, inject('UCManager')),
    __param(4, inject(WordingManager)),
    __metadata("design:paramtypes", [Object, Object, UCBuilder, Object, WordingManager])
], NodeLocalStdioMCPServerManager);
export { NodeLocalStdioMCPServerManager };
