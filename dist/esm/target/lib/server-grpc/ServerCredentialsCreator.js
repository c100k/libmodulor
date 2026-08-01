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
import { ServerCredentials } from '@grpc/grpc-js';
import { inject, injectable } from 'inversify';
import { ServerSSLCertLoader } from '../server/ServerSSLCertLoader.js';
let ServerCredentialsCreator = class ServerCredentialsCreator {
    bufferManager;
    logger;
    serverSSLCertLoader;
    settingsManager;
    constructor(bufferManager, logger, serverSSLCertLoader, settingsManager) {
        this.bufferManager = bufferManager;
        this.logger = logger;
        this.serverSSLCertLoader = serverSSLCertLoader;
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            server_binding_port: this.settingsManager.get()('server_binding_port'),
        };
    }
    async exec(_input) {
        const port = this.s().server_binding_port;
        let creds;
        if (port !== 443) {
            this.logger.info('Creating insecure creds', { port });
            creds = ServerCredentials.createInsecure();
        }
        else {
            this.logger.info('Creating secure creds', { port });
            const { cert, key } = await this.serverSSLCertLoader.exec({});
            creds = ServerCredentials.createSsl(null, [
                {
                    cert_chain: this.bufferManager.from(cert),
                    private_key: this.bufferManager.from(key),
                },
            ]);
        }
        return {
            creds,
        };
    }
};
ServerCredentialsCreator = __decorate([
    injectable(),
    __param(0, inject('BufferManager')),
    __param(1, inject('Logger')),
    __param(2, inject(ServerSSLCertLoader)),
    __param(3, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object, Object, ServerSSLCertLoader, Object])
], ServerCredentialsCreator);
export { ServerCredentialsCreator };
