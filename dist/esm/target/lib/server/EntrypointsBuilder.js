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
let EntrypointsBuilder = class EntrypointsBuilder {
    settingsManager;
    constructor(settingsManager) {
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            server_binding_host: this.settingsManager.get()('server_binding_host'),
            server_binding_port: this.settingsManager.get()('server_binding_port'),
        };
    }
    exec() {
        const host = this.s().server_binding_host;
        const port = this.s().server_binding_port;
        const tcp = `tcp://${host}:${port}`;
        if (port !== 443) {
            return {
                http: `http://${host}${port === 80 ? '' : [':', port].join('')}`,
                tcp,
            };
        }
        return {
            http: `https://${host}`,
            tcp,
        };
    }
};
EntrypointsBuilder = __decorate([
    injectable(),
    __param(0, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object])
], EntrypointsBuilder);
export { EntrypointsBuilder };
