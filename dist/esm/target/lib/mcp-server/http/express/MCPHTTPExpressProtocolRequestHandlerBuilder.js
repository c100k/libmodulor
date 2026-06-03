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
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { inject, injectable } from 'inversify';
import { WordingManager } from '../../../../../i18n/index.js';
import { ucMountingPoint, } from '../../../../../uc/index.js';
import { toReq, toRes } from '../../../server-express/funcs.js';
import { init, toolConfig } from '../../funcs.js';
import { MCPServerRequestChecker } from '../../MCPServerRequestChecker.js';
import { MCPServerRequestHandler } from '../../MCPServerRequestHandler.js';
import { ucStreamExecOpts } from '../funcs.js';
let MCPHTTPExpressProtocolRequestHandlerBuilder = class MCPHTTPExpressProtocolRequestHandlerBuilder {
    logger;
    productManifest;
    serverRequestChecker;
    serverRequestHandler;
    wordingManager;
    constructor(logger, productManifest, serverRequestChecker, serverRequestHandler, wordingManager) {
        this.logger = logger;
        this.productManifest = productManifest;
        this.serverRequestChecker = serverRequestChecker;
        this.serverRequestHandler = serverRequestHandler;
        this.wordingManager = wordingManager;
    }
    exec({ ucs, ucManager, }) {
        return async (req, res) => {
            const { status } = await this.serverRequestChecker.exec({
                req: toReq(req),
            });
            if (status) {
                res.status(status).json({});
                return;
            }
            const server = init(this.productManifest);
            const transport = new StreamableHTTPServerTransport();
            // In Streamable HTTP, there is usually one request => one transport => one server.
            // So there shouldn't be multiple 'stream' use cases invoked at the same time.
            // But maintaining a Map allows us to handle this case if it occurs.
            // This way, we have all the streams available to close them when the transport is closed.
            const execOptss = new Map();
            for (const uc of ucs) {
                const { def: { ext }, } = uc;
                const mountingPoint = ext?.cmd?.mountAt ?? ucMountingPoint(uc);
                const wording = this.wordingManager.uc(uc.def);
                const config = toolConfig(uc, 'server', wording);
                const transportType = ext?.http?.transportType ?? 'standard';
                server.registerTool(mountingPoint, config, (input, extra) => {
                    const execOpts = ucStreamExecOpts(this.logger, transportType, extra);
                    if (execOpts) {
                        execOptss.set(mountingPoint, execOpts);
                    }
                    return this.serverRequestHandler.exec({
                        appManifest: uc.appManifest,
                        envelope: 'json',
                        execOpts,
                        req: {
                            ...toReq(req),
                            bodyFromJSON: async () => input,
                        },
                        res: toRes(res),
                        ucd: uc.def,
                        ucManager,
                    });
                });
            }
            transport.onclose = async () => {
                this.logger.trace('Transport closed => closing streams');
                await Promise.all(execOptss.values().map((eo) => eo.stream?.onClose()));
            };
            res.on('close', async () => {
                this.logger.trace('Connection closed => closing transport');
                await transport.close();
            });
            await server.connect(transport);
            await transport.handleRequest(req, res, req.body);
        };
    }
};
MCPHTTPExpressProtocolRequestHandlerBuilder = __decorate([
    injectable(),
    __param(0, inject('Logger')),
    __param(1, inject('ProductManifest')),
    __param(2, inject(MCPServerRequestChecker)),
    __param(3, inject(MCPServerRequestHandler)),
    __param(4, inject(WordingManager)),
    __metadata("design:paramtypes", [Object, Object, MCPServerRequestChecker,
        MCPServerRequestHandler,
        WordingManager])
], MCPHTTPExpressProtocolRequestHandlerBuilder);
export { MCPHTTPExpressProtocolRequestHandlerBuilder };
