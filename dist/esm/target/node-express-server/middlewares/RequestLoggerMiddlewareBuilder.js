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
import { RequestLogger } from '../../lib/server/RequestLogger.js';
let RequestLoggerMiddlewareBuilder = class RequestLoggerMiddlewareBuilder {
    logger;
    requestLogger;
    constructor(logger, requestLogger) {
        this.logger = logger;
        this.requestLogger = requestLogger;
    }
    exec(_input) {
        return (req, _, nextFn) => {
            try {
                this.requestLogger.exec({
                    body: req.body,
                    method: req.method,
                    url: req.url,
                });
                nextFn();
            }
            catch (err) {
                this.logger.error(err);
                // Continue as usual : the user shouldn't be impacted if we have issues logging the requests
                nextFn();
            }
        };
    }
};
RequestLoggerMiddlewareBuilder = __decorate([
    injectable(),
    __param(0, inject('Logger')),
    __param(1, inject(RequestLogger)),
    __metadata("design:paramtypes", [Object, RequestLogger])
], RequestLoggerMiddlewareBuilder);
export { RequestLoggerMiddlewareBuilder };
