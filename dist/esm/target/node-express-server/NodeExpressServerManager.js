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
import cookieParser from 'cookie-parser';
import express, {} from 'express';
import fileUpload from 'express-fileupload';
import { inject, injectable } from 'inversify';
import { EntrypointsBuilder } from '../lib/server/EntrypointsBuilder.js';
import { ServerRequestHandler, } from '../lib/server/ServerRequestHandler.js';
import { ServerSSLCertLoader } from '../lib/server/ServerSSLCertLoader.js';
import { stop } from '../lib/server-node/stop.js';
import { HelmetMiddlewareBuilder } from './middlewares/HelmetMiddlewareBuilder.js';
let NodeExpressServerManager = class NodeExpressServerManager {
    entrypointsBuilder;
    environmentManager;
    helmetMB;
    logger;
    serverRequestHandler;
    serverSSLCertLoader;
    settingsManager;
    ucManager;
    runtime;
    server;
    constructor(entrypointsBuilder, environmentManager, helmetMB, logger, serverRequestHandler, serverSSLCertLoader, settingsManager, ucManager) {
        this.entrypointsBuilder = entrypointsBuilder;
        this.environmentManager = environmentManager;
        this.helmetMB = helmetMB;
        this.logger = logger;
        this.serverRequestHandler = serverRequestHandler;
        this.serverSSLCertLoader = serverSSLCertLoader;
        this.settingsManager = settingsManager;
        this.ucManager = ucManager;
    }
    s() {
        return {
            logger_level: this.settingsManager.get()('logger_level'),
            server_binding_host: this.settingsManager.get()('server_binding_host'),
            server_binding_port: this.settingsManager.get()('server_binding_port'),
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
        this.runtime = express();
        this.runtime.use(this.helmetMB.exec({}));
        // TODO : Add FileStorageManager (Local, S3, FSBucket)
        // Right now, the files are only stored locally. We need more flexibility. Maybe we can also install https://imgproxy.net.
        this.runtime.use(fileUpload({
            createParentPath: true,
            debug: this.s().logger_level === 'trace',
            tempFileDir: this.s().server_tmp_path,
            useTempFiles: true,
        }));
        this.runtime.use(express.json());
        this.runtime.use(express.urlencoded({ extended: true }));
        this.runtime.use(cookieParser());
        await this.createServer();
    }
    async mount(appManifest, ucd, contract) {
        const { envelope, method, path, pathAliases } = contract;
        const httpMethod = method.toLowerCase();
        const handler = async (req, res) => {
            const { body, status } = await this.serverRequestHandler.exec({
                appManifest,
                envelope,
                req: this.toReq(req),
                res: this.toRes(res),
                ucd,
                ucManager: this.ucManager,
            });
            if (!body) {
                res.status(status).send();
                return;
            }
            res.status(status).send(body);
        };
        this.runtime[httpMethod](path, handler);
        for (const pathAlias of pathAliases) {
            this.runtime[httpMethod](pathAlias, handler);
        }
    }
    async mountStaticDir(dirPath) {
        this.runtime.use(express.static(dirPath));
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
        const port = this.s().server_binding_port;
        if (port !== 443) {
            this.logger.info('Creating HTTP server', { port });
            this.server = http.createServer(this.runtime);
            return;
        }
        this.logger.info('Creating HTTPS server', { port });
        const credentials = await this.serverSSLCertLoader.exec(undefined);
        this.server = https.createServer(credentials, this.runtime);
    }
    toFile(f) {
        return {
            name: f.name,
            path: f.tempFilePath,
            type: f.mimetype,
        };
    }
    toReq(req) {
        return {
            bodyFromFormData: async () => {
                // Since express v5, if the request contains only a file, the `req.body` returns `undefined`
                const input = req.body ?? {};
                // files is present when using express-fileupload
                if ('files' in req && req.files) {
                    for (const [field, value] of Object.entries(req.files)) {
                        input[field] = Array.isArray(value)
                            ? value.map(this.toFile)
                            : this.toFile(value);
                    }
                }
                for (const [k, v] of Object.entries(input)) {
                    const isMultiple = k.endsWith('[]'); // e.g. 'tags[]': 'Electronic'
                    const key = isMultiple ? k.replaceAll('[]', '') : k;
                    if (isMultiple) {
                        input[key] = Array.isArray(v) ? v : [v];
                    }
                    else {
                        input[key] = v;
                    }
                }
                return input;
            },
            bodyFromJSON: async () => req.body,
            bodyFromQueryParams: async () => req.query,
            bodyRaw: req.body,
            cookie: (name) => req.cookies[name],
            header: async (name) => {
                const h = req.headers[name.toLowerCase()];
                if (Array.isArray(h)) {
                    this.logger.warn(`Multiple headers found for ${name}. Returning the first one.`);
                    return h[0];
                }
                return h;
            },
            method: req.method,
            secure: req.secure,
            url: req.url,
        };
    }
    toRes(res) {
        return {
            clearCookie: async (name) => {
                res.clearCookie(name);
            },
            redirect: async (location) => res.redirect(location),
            setCookie: async ({ name, opts, val }) => {
                res.cookie(name, val, opts);
            },
        };
    }
};
NodeExpressServerManager = __decorate([
    injectable(),
    __param(0, inject(EntrypointsBuilder)),
    __param(1, inject('EnvironmentManager')),
    __param(2, inject(HelmetMiddlewareBuilder)),
    __param(3, inject('Logger')),
    __param(4, inject(ServerRequestHandler)),
    __param(5, inject(ServerSSLCertLoader)),
    __param(6, inject('SettingsManager')),
    __param(7, inject('UCManager')),
    __metadata("design:paramtypes", [EntrypointsBuilder, Object, HelmetMiddlewareBuilder, Object, ServerRequestHandler,
        ServerSSLCertLoader, Object, Object])
], NodeExpressServerManager);
export { NodeExpressServerManager };
