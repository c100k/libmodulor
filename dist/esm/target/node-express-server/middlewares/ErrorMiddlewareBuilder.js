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
import { CustomerFacingErrorBuilder } from '../../lib/server/CustomerFacingErrorBuilder.js';
let ErrorMiddlewareBuilder = class ErrorMiddlewareBuilder {
    customerFacingErrorBuilder;
    constructor(customerFacingErrorBuilder) {
        this.customerFacingErrorBuilder = customerFacingErrorBuilder;
    }
    exec(_input) {
        return (error, _req, res, nextFn) => {
            const { error: customError } = this.customerFacingErrorBuilder.exec({
                error,
            });
            res.status(customError.httpStatus).send(customError.toObj());
            nextFn();
        };
    }
};
ErrorMiddlewareBuilder = __decorate([
    injectable(),
    __param(0, inject(CustomerFacingErrorBuilder)),
    __metadata("design:paramtypes", [CustomerFacingErrorBuilder])
], ErrorMiddlewareBuilder);
export { ErrorMiddlewareBuilder };
