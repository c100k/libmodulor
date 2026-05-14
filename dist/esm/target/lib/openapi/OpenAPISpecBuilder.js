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
import { WordingManager } from '../../../i18n/index.js';
import { formatFQUCInputName, formatFQUCName, ucHTTPContract, } from '../../../uc/index.js';
import { DEFAULT_VERSION } from '../shared.js';
import { openAPIErrorSchema, openAPIErrors, openAPIInputSchema, openAPIParameters, openAPIRequestBody, openAPISecurity, openAPISecuritySchemes, openAPISuccess, } from './funcs.js';
let OpenAPISpecBuilder = class OpenAPISpecBuilder {
    i18nManager;
    productManifest;
    settingsManager;
    wordingManager;
    constructor(i18nManager, productManifest, settingsManager, wordingManager) {
        this.i18nManager = i18nManager;
        this.productManifest = productManifest;
        this.settingsManager = settingsManager;
        this.wordingManager = wordingManager;
    }
    s() {
        return {
            server_cookies_name_auth: this.settingsManager.get()('server_cookies_name_auth'),
            server_public_api_key_header_name: this.settingsManager.get()('server_public_api_key_header_name'),
            server_public_url: this.settingsManager.get()('server_public_url'),
        };
    }
    async exec({ ucs }) {
        const output = this.initOutput();
        const errors = this.initErrors();
        const { desc, slogan } = this.wordingManager.p();
        if (desc) {
            output.spec.info.description = desc;
        }
        if (slogan) {
            output.spec.info.summary = slogan;
        }
        for (const uc of ucs) {
            const { method, path, pathAliases, envelope } = ucHTTPContract(uc);
            const httpMethod = method.toLowerCase();
            const fqUCName = formatFQUCName(uc.appManifest.name, uc.def.metadata.name);
            const fqUCInputName = formatFQUCInputName(fqUCName);
            output.spec.components.schemas[fqUCInputName] =
                openAPIInputSchema(uc);
            for (const p of [path, ...pathAliases]) {
                output.spec.paths[p] = {
                    ...output.spec.paths[p],
                    [httpMethod]: this.initPath(errors, uc, envelope, fqUCInputName),
                };
            }
        }
        return output;
    }
    initErrors() {
        const errors = openAPIErrors();
        for (const error of Object.values(errors)) {
            error.description = this.i18nManager.t(error.description);
        }
        return errors;
    }
    initOutput() {
        return {
            spec: {
                components: {
                    schemas: {
                        Error: openAPIErrorSchema(),
                    },
                    securitySchemes: openAPISecuritySchemes(this.s().server_cookies_name_auth, this.s().server_public_api_key_header_name),
                },
                info: {
                    title: this.productManifest.name,
                    version: this.productManifest.version ?? DEFAULT_VERSION,
                },
                openapi: '3.1.0',
                paths: {},
                servers: [
                    {
                        url: this.s().server_public_url,
                    },
                ],
            },
        };
    }
    initPath(errors, 
    // biome-ignore lint/suspicious/noExplicitAny: can be anything
    uc, envelope, fqUCInputName) {
        const { desc, label } = this.wordingManager.uc(uc.def);
        const res_200 = this.i18nManager.t('res_200');
        const res_204 = this.i18nManager.t('res_204');
        const path = {
            responses: {
                ...openAPISuccess(uc, { 200: res_200, 204: res_204 }),
                ...errors,
                // TODO : Infer errors that can be sent within ServerMain
            },
            security: openAPISecurity(uc.def.sec),
            summary: label,
            tags: [uc.appManifest.name],
        };
        if (desc) {
            path.description = desc;
        }
        switch (envelope) {
            case 'form-data':
            case 'json':
                path.requestBody = openAPIRequestBody(uc, envelope, fqUCInputName);
                break;
            case 'query-params':
                path.parameters = openAPIParameters(uc, envelope);
                break;
            default:
                envelope;
        }
        return path;
    }
};
OpenAPISpecBuilder = __decorate([
    injectable(),
    __param(0, inject('I18nManager')),
    __param(1, inject('ProductManifest')),
    __param(2, inject('SettingsManager')),
    __param(3, inject(WordingManager)),
    __metadata("design:paramtypes", [Object, Object, Object, WordingManager])
], OpenAPISpecBuilder);
export { OpenAPISpecBuilder };
