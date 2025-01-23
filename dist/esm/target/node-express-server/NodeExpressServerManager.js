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
import { AuthenticationCheckerMiddlewareBuilder } from './middlewares/AuthenticationCheckerMiddlewareBuilder.js';
import { ErrorMiddlewareBuilder } from './middlewares/ErrorMiddlewareBuilder.js';
import { HelmetMiddlewareBuilder } from './middlewares/HelmetMiddlewareBuilder.js';
import { PublicApiKeyCheckerMiddlewareBuilder } from './middlewares/PublicApiKeyCheckerMiddlewareBuilder.js';
import { RequestCheckerMiddlewareBuilder } from './middlewares/RequestCheckerMiddlewareBuilder.js';
import { RequestHandlerMiddlewareBuilder } from './middlewares/RequestHandlerMiddlewareBuilder.js';
import { RequestLoggerMiddlewareBuilder } from './middlewares/RequestLoggerMiddlewareBuilder.js';
let NodeExpressServerManager = class NodeExpressServerManager {
    authenticationCheckerMB;
    entrypointsBuilder;
    environmentManager;
    errorMB;
    fsManager;
    helmetMB;
    logger;
    publicApiKeyCheckerMB;
    requestCheckerMB;
    requestHandlerMB;
    requestLoggerMB;
    settingsManager;
    ucManager;
    runtime;
    server;
    constructor(authenticationCheckerMB, entrypointsBuilder, environmentManager, errorMB, fsManager, helmetMB, logger, publicApiKeyCheckerMB, requestCheckerMB, requestHandlerMB, requestLoggerMB, settingsManager, ucManager) {
        this.authenticationCheckerMB = authenticationCheckerMB;
        this.entrypointsBuilder = entrypointsBuilder;
        this.environmentManager = environmentManager;
        this.errorMB = errorMB;
        this.fsManager = fsManager;
        this.helmetMB = helmetMB;
        this.logger = logger;
        this.publicApiKeyCheckerMB = publicApiKeyCheckerMB;
        this.requestCheckerMB = requestCheckerMB;
        this.requestHandlerMB = requestHandlerMB;
        this.requestLoggerMB = requestLoggerMB;
        this.settingsManager = settingsManager;
        this.ucManager = ucManager;
    }
    s() {
        return {
            logger_level: this.settingsManager.get()('logger_level'),
            server_binding_host: this.settingsManager.get()('server_binding_host'),
            server_binding_port: this.settingsManager.get()('server_binding_port'),
            server_ssl_fullchain_path: this.settingsManager.get()('server_ssl_fullchain_path'),
            server_ssl_key_path: this.settingsManager.get()('server_ssl_key_path'),
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
        this.runtime.use(fileUpload({
            createParentPath: true,
            debug: this.s().logger_level === 'trace',
            tempFileDir: this.s().server_tmp_path,
            useTempFiles: true,
        }));
        this.runtime.use(express.json());
        this.runtime.use(express.urlencoded({ extended: true }));
        this.runtime.use(cookieParser());
        this.runtime.use(this.requestLoggerMB.exec({}));
        this.runtime.use(this.requestCheckerMB.exec({}));
        await this.createServer();
    }
    async mount(appManifest, ucd, contract) {
        const { sec } = ucd;
        const { envelope, method, path, pathAliases } = contract;
        const httpMethod = method.toLowerCase();
        const handlers = [
            this.publicApiKeyCheckerMB.exec({
                checkType: sec?.publicApiKeyCheckType,
            }),
            this.authenticationCheckerMB.exec({ appManifest, ucd }),
            this.requestHandlerMB.exec({
                appManifest,
                envelope,
                ucd,
                ucManager: this.ucManager,
            }),
        ];
        this.runtime[httpMethod](path, handlers);
        for (const pathAlias of pathAliases) {
            this.runtime[httpMethod](pathAlias, handlers);
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
        if (!this.server?.listening) {
            return;
        }
        return new Promise((resolve, reject) => {
            if (!this.server) {
                return resolve();
            }
            this.server.close((err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
    async warmUp() {
        this.runtime.use(this.errorMB.exec({}));
    }
    async createServer() {
        const port = this.s().server_binding_port;
        if (port !== 443) {
            this.logger.info('Creating HTTP server', { port });
            this.server = http.createServer(this.runtime);
            return;
        }
        this.logger.info('Creating HTTPS server', { port });
        const fullchainPath = this.s().server_ssl_fullchain_path;
        const keyPath = this.s().server_ssl_key_path;
        if (!fullchainPath || !keyPath) {
            throw new Error('You must provide server_ssl_fullchain_path and server_ssl_key_path to start on secure port 443');
        }
        const credentials = {
            cert: await this.fsManager.cat(fullchainPath),
            key: await this.fsManager.cat(keyPath),
        };
        this.server = https.createServer(credentials, this.runtime);
    }
};
NodeExpressServerManager = __decorate([
    injectable(),
    __param(0, inject(AuthenticationCheckerMiddlewareBuilder)),
    __param(1, inject(EntrypointsBuilder)),
    __param(2, inject('EnvironmentManager')),
    __param(3, inject(ErrorMiddlewareBuilder)),
    __param(4, inject('FSManager')),
    __param(5, inject(HelmetMiddlewareBuilder)),
    __param(6, inject('Logger')),
    __param(7, inject(PublicApiKeyCheckerMiddlewareBuilder)),
    __param(8, inject(RequestCheckerMiddlewareBuilder)),
    __param(9, inject(RequestHandlerMiddlewareBuilder)),
    __param(10, inject(RequestLoggerMiddlewareBuilder)),
    __param(11, inject('SettingsManager')),
    __param(12, inject('UCManager')),
    __metadata("design:paramtypes", [AuthenticationCheckerMiddlewareBuilder,
        EntrypointsBuilder, Object, ErrorMiddlewareBuilder, Object, HelmetMiddlewareBuilder, Object, PublicApiKeyCheckerMiddlewareBuilder,
        RequestCheckerMiddlewareBuilder,
        RequestHandlerMiddlewareBuilder,
        RequestLoggerMiddlewareBuilder, Object, Object])
], NodeExpressServerManager);
export { NodeExpressServerManager };
