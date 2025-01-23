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
let RequestLogger = class RequestLogger {
    environmentManager;
    logger;
    constructor(environmentManager, logger) {
        this.environmentManager = environmentManager;
        this.logger = logger;
    }
    exec({ body, method, url }) {
        const prefix = [method, url].join(' ');
        if (this.environmentManager.isProd()) {
            this.logger.debug(prefix);
            return;
        }
        this.logger.debug(prefix, JSON.stringify(body));
    }
};
RequestLogger = __decorate([
    injectable(),
    __param(0, inject('EnvironmentManager')),
    __param(1, inject('Logger')),
    __metadata("design:paramtypes", [Object, Object])
], RequestLogger);
export { RequestLogger };
