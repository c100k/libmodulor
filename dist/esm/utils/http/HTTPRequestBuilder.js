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
import { toFormData } from './form-data.js';
import { toJSON } from './json.js';
import { toQueryParams } from './query-params.js';
let HTTPRequestBuilder = class HTTPRequestBuilder {
    formDataBuilder;
    constructor(formDataBuilder) {
        this.formDataBuilder = formDataBuilder;
    }
    async exec({ baseURL, data, envelope }) {
        const output = {
            body: null,
            url: baseURL,
        };
        switch (envelope) {
            case 'form-data': {
                const fd = new FormData();
                await toFormData(data, fd, this.formDataBuilder);
                output.body = fd;
                break;
            }
            case 'json':
                output.body = toJSON(data);
                break;
            case 'query-params': {
                const url = new URL(baseURL);
                await toQueryParams(data, url);
                output.url = url.toString();
                break;
            }
            default:
                envelope;
                return output;
        }
        return output;
    }
};
HTTPRequestBuilder = __decorate([
    injectable(),
    __param(0, inject('FormDataBuilder')),
    __metadata("design:paramtypes", [Object])
], HTTPRequestBuilder);
export { HTTPRequestBuilder };
