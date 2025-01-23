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
import { CustomError, IllegalArgumentError } from '../../error/index.js';
import { HTTPRequestBuilder } from '../../utils/index.js';
let SimpleHTTPAPICaller = class SimpleHTTPAPICaller {
    bufferManager;
    httpAPICallExecutor;
    httpAPICallExecutorAgentBuilder;
    httpRequestBuilder;
    logger;
    xmlManager;
    constructor(bufferManager, httpAPICallExecutor, httpAPICallExecutorAgentBuilder, httpRequestBuilder, logger, xmlManager) {
        this.bufferManager = bufferManager;
        this.httpAPICallExecutor = httpAPICallExecutor;
        this.httpAPICallExecutorAgentBuilder = httpAPICallExecutorAgentBuilder;
        this.httpRequestBuilder = httpRequestBuilder;
        this.logger = logger;
        this.xmlManager = xmlManager;
    }
    async exec({ additionalHeadersBuilder, authorizationHeader, basicAuth, contentType = 'application/json', errBuilder, method, opts, outputBuilder, req, urlBuilder, unknownErrorMessage = CustomError.ERROR_UNKNOWN, }) {
        const baseURL = await urlBuilder();
        const data = (await req?.builder?.()) || {};
        const { body, url } = await this.httpRequestBuilder.exec({
            baseURL,
            data,
            envelope: req?.envelope || 'query-params',
        });
        const reqHeaders = await this.computeHeaders({
            additionalHeadersBuilder,
            authorizationHeader,
            basicAuth,
            contentType,
            req,
        });
        const agent = this.httpAPICallExecutorAgentBuilder.exec({
            url: new URL(url),
        });
        const response = await this.httpAPICallExecutor.fn()(url, {
            agent,
            body,
            headers: reqHeaders,
            method,
        });
        const { headers, status } = response;
        this.logger.trace('HTTPAPICaller', {
            body,
            method,
            reqHeaders,
            resHeaders: Array.from(headers.entries()),
            status,
            url,
        });
        if (status === 202 || status === 204) {
            return {};
        }
        const responseContentType = headers.get('Content-Type');
        const isJSON = responseContentType?.startsWith('application/json');
        const isFormURLEncoded = responseContentType?.startsWith('application/x-www-form-urlencoded');
        const isXML = responseContentType?.startsWith('text/xml');
        this.logger.trace('HTTPAPICaller', {
            isFormURLEncoded,
            isJSON,
            isXML,
        });
        const { ok, redirected } = response;
        if (ok || redirected) {
            return this.processResGood({ opts, outputBuilder }, isFormURLEncoded, isJSON, isXML, response);
        }
        const errMsg = await this.processResBad({ errBuilder, opts }, isJSON, isXML, response);
        const message = errMsg ?? unknownErrorMessage;
        if (status < 500) {
            throw new IllegalArgumentError(message);
        }
        throw new Error(message);
    }
    async computeHeaders({ additionalHeadersBuilder, authorizationHeader, basicAuth, contentType = 'application/json', req, }) {
        const headers = {};
        if (req?.envelope !== 'form-data') {
            headers['Content-Type'] = contentType;
        }
        if (authorizationHeader) {
            const { prefix, value } = authorizationHeader;
            headers['Authorization'] = [prefix, value].join(' ').trim();
        }
        if (basicAuth) {
            const { password, username } = basicAuth;
            const prefix = 'Basic';
            const value = this.bufferManager.encodeBase64([username, password].join(':'));
            headers['Authorization'] = [prefix, value].join(' ').trim();
        }
        if (additionalHeadersBuilder) {
            const additionalHeaders = await additionalHeadersBuilder();
            if (additionalHeaders) {
                for (const [k, v] of Object.entries(additionalHeaders)) {
                    headers[k] = v;
                }
            }
        }
        return headers;
    }
    async processResBad({ errBuilder, opts, }, isJSON, isXML, response) {
        let error;
        try {
            if (isJSON) {
                error = await response.json();
            }
            else {
                const asText = await response.text();
                this.logger.trace('HTTPAPICaller', {
                    asText,
                });
                if (isXML) {
                    error = await this.xmlManager.parse(asText, opts?.xml);
                }
                else {
                    error = asText;
                }
            }
            this.logger.trace('HTTPAPICaller', { error });
        }
        catch (err) {
            this.logger.error(err);
            return null;
        }
        if (typeof error === 'string') {
            return error.trim();
        }
        if (!error) {
            return null;
        }
        try {
            const message = await errBuilder(error);
            if (typeof message === 'string') {
                return message;
            }
            return JSON.stringify(message);
        }
        catch (err) {
            this.logger.error(err);
            return JSON.stringify(error);
        }
    }
    async processResGood({ opts, outputBuilder, }, isFormURLEncoded, isJSON, isXML, response) {
        let payload;
        if (isJSON) {
            payload = await response.json();
        }
        else {
            const asText = await response.text();
            this.logger.trace('HTTPAPICaller', {
                asText,
            });
            if (isFormURLEncoded) {
                payload = {};
                new URL(`http://localhost?${asText}`).searchParams.forEach((v, k) => {
                    payload[k] = v;
                });
            }
            else if (isXML) {
                payload = await this.xmlManager.parse(asText, opts?.xml);
            }
            else {
                payload = asText;
            }
        }
        this.logger.trace('HTTPAPICaller', {
            payload,
        });
        if (payload && outputBuilder) {
            return outputBuilder(payload);
        }
        return payload;
    }
};
SimpleHTTPAPICaller = __decorate([
    injectable(),
    __param(0, inject('BufferManager')),
    __param(1, inject('HTTPAPICallExecutor')),
    __param(2, inject('HTTPAPICallExecutorAgentBuilder')),
    __param(3, inject(HTTPRequestBuilder)),
    __param(4, inject('Logger')),
    __param(5, inject('XMLManager')),
    __metadata("design:paramtypes", [Object, Object, Object, HTTPRequestBuilder, Object, Object])
], SimpleHTTPAPICaller);
export { SimpleHTTPAPICaller };
