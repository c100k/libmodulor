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
import http from 'node:http';
import https from 'node:https';
import { createAdaptorServer, } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { inject, injectable } from 'inversify';
import { fromFormData } from '../../utils/index.js';
import { stop } from '../lib/server-node/stop.js';
import { EntrypointsBuilder } from '../lib/server/EntrypointsBuilder.js';
import { ServerRequestHandler, } from '../lib/server/ServerRequestHandler.js';
import { ServerSSLCertLoader } from '../lib/server/ServerSSLCertLoader.js';
let NodeHonoServerManager = class NodeHonoServerManager {
    entrypointsBuilder;
    environmentManager;
    logger;
    serverRequestHandler;
    serverSSLCertLoader;
    settingsManager;
    ucManager;
    runtime;
    server;
    constructor(entrypointsBuilder, environmentManager, logger, serverRequestHandler, serverSSLCertLoader, settingsManager, ucManager) {
        this.entrypointsBuilder = entrypointsBuilder;
        this.environmentManager = environmentManager;
        this.logger = logger;
        this.serverRequestHandler = serverRequestHandler;
        this.serverSSLCertLoader = serverSSLCertLoader;
        this.settingsManager = settingsManager;
        this.ucManager = ucManager;
    }
    s() {
        return {
            server_binding_host: this.settingsManager.get()('server_binding_host'),
            server_binding_port: this.settingsManager.get()('server_binding_port'),
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
        this.runtime = new Hono();
        this.runtime.use(secureHeaders());
        this.runtime.use(logger());
        this.runtime.notFound((c) => {
            return c.json({}, 404);
        });
        await this.createServer();
    }
    async mount(appManifest, ucd, contract) {
        const { envelope, method, path, pathAliases } = contract;
        const httpMethod = method.toLowerCase();
        if (httpMethod === 'connect' ||
            httpMethod === 'head' ||
            httpMethod === 'trace') {
            throw new Error(`Unsupported HTTP method : ${httpMethod}`);
        }
        const handler = async (c) => {
            const { body, status } = await this.serverRequestHandler.exec({
                appManifest,
                envelope,
                req: this.toReq(c),
                res: this.toRes(c),
                ucd,
                ucManager: this.ucManager,
            });
            if (!body) {
                return c.newResponse(null, status);
            }
            return c.json(body, status);
        };
        this.runtime[httpMethod](path, handler);
        for (const pathAlias of pathAliases) {
            this.runtime[httpMethod](pathAlias, handler);
        }
    }
    async mountStaticDir(dirPath) {
        this.runtime.use(serveStatic({ root: dirPath }));
    }
    async start() {
        const host = this.s().server_binding_host;
        const port = this.s().server_binding_port;
        this.server.listen(port, host, () => {
            this.logger.info(`Listening on ${this.entrypointsBuilder.exec().http}`);
        });
    }
    async stop() {
        await stop(this.server);
    }
    async warmUp() {
        // Nothing to do
    }
    async createServer() {
        const host = this.s().server_binding_host;
        const port = this.s().server_binding_port;
        const opts = {
            fetch: this.runtime.fetch,
            hostname: host,
            port,
        };
        if (port !== 443) {
            this.logger.info('Creating HTTP server', { port });
            opts.createServer = http.createServer;
            this.server = createAdaptorServer(opts);
            return;
        }
        this.logger.info('Creating HTTPS server', { port });
        opts.createServer = https.createServer;
        opts.serverOptions = await this.serverSSLCertLoader.exec(undefined);
        this.server = createAdaptorServer(opts);
    }
    toReq(c) {
        return {
            bodyFromFormData: async () => fromFormData(await c.req.formData()),
            bodyFromJSON: () => c.req.json(),
            bodyFromQueryParams: async () => c.req.queries(),
            bodyRaw: c.req.raw,
            cookie: async (name) => getCookie(c, name),
            header: async (name) => c.req.header(name),
            method: c.req.method,
            secure: c.req.url.startsWith('https://'),
            url: c.req.url,
        };
    }
    toRes(c) {
        return {
            clearCookie: async (name) => {
                deleteCookie(c, name);
            },
            redirect: async (location) => {
                c.redirect(location);
            },
            setCookie: async ({ name, opts, val }) => setCookie(c, name, val, opts),
        };
    }
};
NodeHonoServerManager = __decorate([
    injectable(),
    __param(0, inject(EntrypointsBuilder)),
    __param(1, inject('EnvironmentManager')),
    __param(2, inject('Logger')),
    __param(3, inject(ServerRequestHandler)),
    __param(4, inject(ServerSSLCertLoader)),
    __param(5, inject('SettingsManager')),
    __param(6, inject('UCManager')),
    __metadata("design:paramtypes", [EntrypointsBuilder, Object, Object, ServerRequestHandler,
        ServerSSLCertLoader, Object, Object])
], NodeHonoServerManager);
export { NodeHonoServerManager };
