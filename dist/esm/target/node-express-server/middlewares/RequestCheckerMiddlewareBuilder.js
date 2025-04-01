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
import { RequestChecker } from '../../lib/server/RequestChecker.js';
let RequestCheckerMiddlewareBuilder = class RequestCheckerMiddlewareBuilder {
    requestChecker;
    constructor(requestChecker) {
        this.requestChecker = requestChecker;
    }
    exec(_input) {
        return (req, _res, nextFn) => {
            this.requestChecker.exec({
                secure: req.secure,
                url: req.url,
                xForwardedProtoHeader: req.get('X-Forwarded-Proto'),
            });
            nextFn();
        };
    }
};
RequestCheckerMiddlewareBuilder = __decorate([
    injectable(),
    __param(0, inject(RequestChecker)),
    __metadata("design:paramtypes", [RequestChecker])
], RequestCheckerMiddlewareBuilder);
export { RequestCheckerMiddlewareBuilder };
