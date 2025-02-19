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
import { CustomError, InternalServerError } from '../../../error/index.js';
let CustomerFacingErrorBuilder = class CustomerFacingErrorBuilder {
    environmentManager;
    logger;
    constructor(environmentManager, logger) {
        this.environmentManager = environmentManager;
        this.logger = logger;
    }
    exec({ error }) {
        if (error instanceof CustomError) {
            // It's already ready to be sent as is
            return {
                error,
            };
        }
        this.logger.error(error);
        // Create a specific generic error to avoid leaking potentially sensitive error
        // We all know the infamous "Cannot connect to MySQL database"...
        return {
            error: new InternalServerError(this.environmentManager.isProd()
                ? undefined
                : error.message),
        };
    }
};
CustomerFacingErrorBuilder = __decorate([
    injectable(),
    __param(0, inject('EnvironmentManager')),
    __param(1, inject('Logger')),
    __metadata("design:paramtypes", [Object, Object])
], CustomerFacingErrorBuilder);
export { CustomerFacingErrorBuilder };
