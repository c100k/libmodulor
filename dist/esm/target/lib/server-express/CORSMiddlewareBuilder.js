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
let CORSMiddlewareBuilder = class CORSMiddlewareBuilder {
    settingsManager;
    constructor(settingsManager) {
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            server_cors_credentials: this.settingsManager.get()('server_cors_credentials'),
            server_cors_headers: this.settingsManager.get()('server_cors_headers'),
            server_cors_methods: this.settingsManager.get()('server_cors_methods'),
            server_cors_origins: this.settingsManager.get()('server_cors_origins'),
            server_public_api_key_header_name: this.settingsManager.get()('server_public_api_key_header_name'),
        };
    }
    exec(_input) {
        return (req, res, next) => {
            res.header('Access-Control-Allow-Credentials', String(this.s().server_cors_credentials));
            res.header('Access-Control-Allow-Headers', this.fmt([
                ...this.s().server_cors_headers,
                this.s().server_public_api_key_header_name,
            ]));
            res.header('Access-Control-Allow-Methods', this.fmt(this.s().server_cors_methods));
            const { origin } = req.headers;
            if (origin) {
                const electedOrigin = this.s().server_cors_origins.find((o) => o.startsWith(origin));
                if (electedOrigin) {
                    res.header('Access-Control-Allow-Origin', electedOrigin);
                }
            }
            next();
        };
    }
    fmt(arr) {
        return arr.join(', ');
    }
};
CORSMiddlewareBuilder = __decorate([
    injectable(),
    __param(0, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object])
], CORSMiddlewareBuilder);
export { CORSMiddlewareBuilder };
