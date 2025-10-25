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
import { HTTPRequestBuilder, isClientError, NDJSONStreamManager, SSEStreamManager, } from '../../utils/index.js';
export const ERR_STREAM_UNAVAILABLE = 'The internal HTTP impl (fetch ?) does not implement streaming (React Native ?)';
let SimpleHTTPAPICaller = class SimpleHTTPAPICaller {
    bufferManager;
    httpAPICallExecutor;
    httpAPICallExecutorAgentBuilder;
    httpRequestBuilder;
    logger;
    ndJSONStreamManager;
    sseStreamManager;
    xmlManager;
    constructor(bufferManager, httpAPICallExecutor, httpAPICallExecutorAgentBuilder, httpRequestBuilder, logger, ndJSONStreamManager, sseStreamManager, xmlManager) {
        this.bufferManager = bufferManager;
        this.httpAPICallExecutor = httpAPICallExecutor;
        this.httpAPICallExecutorAgentBuilder = httpAPICallExecutorAgentBuilder;
        this.httpRequestBuilder = httpRequestBuilder;
        this.logger = logger;
        this.ndJSONStreamManager = ndJSONStreamManager;
        this.sseStreamManager = sseStreamManager;
        this.xmlManager = xmlManager;
    }
    async exec({ additionalHeadersBuilder, authorizationHeader, basicAuth, contentType = 'application/json', errBuilder, method, opts, outputBuilder, registerAbort, req, stream, urlBuilder, unknownErrorMessage = CustomError.ERROR_UNKNOWN, }) {
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
        const abortController = new AbortController();
        registerAbort?.(() => {
            abortController.abort();
        });
        const response = await this.httpAPICallExecutor.fn()(url, {
            agent,
            body,
            headers: reqHeaders,
            method,
            signal: abortController.signal,
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
        // Using .startsWith instead of === because the value can look like this 'application/json; charset=utf-8'
        const responseContentType = headers.get('Content-Type');
        const isFormURLEncoded = responseContentType?.startsWith('application/x-www-form-urlencoded');
        const isJSON = responseContentType?.startsWith('application/json');
        const isNDJSON = responseContentType?.startsWith('application/x-ndjson');
        const isSSE = responseContentType?.startsWith('text/event-stream');
        const isXML = responseContentType?.startsWith('text/xml');
        this.logger.trace('HTTPAPICaller', {
            isFormURLEncoded,
            isJSON,
            isNDJSON,
            isSSE,
            isXML,
        });
        const { ok, redirected } = response;
        if (ok || redirected) {
            return this.processResGood({ opts, outputBuilder, stream }, isFormURLEncoded, isJSON, isNDJSON, isSSE, isXML, response);
        }
        const message = await this.processResBad({ errBuilder, opts }, isJSON, isXML, response);
        this.throwError(message ?? unknownErrorMessage, status);
    }
    async computeHeaders({ additionalHeadersBuilder, authorizationHeader, basicAuth, contentType = 'application/json', req, }) {
        const headers = {};
        if (req?.envelope !== 'form-data') {
            // The boundary needs to be set when sending data this way, so the server can understand how to read it (Source : https://stackoverflow.com/a/20321259/1259118)
            // In RN, the content-type we set is automatically overriden by the internal fetch client (i.e. 'content-type': 'multipart/form-data; boundary=7ZsqoHiTstShSc4-Yi4U7ier3GPc_4QL5iN2eT9rnSNd0g1UoFPgt3I6.fsWlV8YpJhFkG')
            // In CLI, if it is set, it's not overriden. So it creates problems. With 'form-data', we send 'content-type': 'multipart/form-data'` but the server expects something like 'content-type': 'multipart/form-data;boundary=--------------------------743913816161509008636675'
            // So we don't set it at all and we're good to go.
            headers['Content-Type'] = contentType;
        }
        if (authorizationHeader) {
            const { prefix, value } = authorizationHeader;
            headers.Authorization = [prefix, value].join(' ').trim();
        }
        if (basicAuth) {
            const { password, username } = basicAuth;
            const prefix = 'Basic';
            const value = this.bufferManager.encodeBase64([username, password].join(':'));
            headers.Authorization = [prefix, value].join(' ').trim();
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
        // NOTE : This method must handle all possible cases and never throw
        // Indeed, it's supposed to handle the errors so it shouldn't throw one
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
            // For example, it can be from `asText`, containing funny formatting (developers and errors you know...)
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
            // Case where `errBuilder` is of type (error: string) => string
            // If an object is passed to it, it would return an object instead, interpreted incorrectly as [object Object] by error handlers
            return JSON.stringify(message);
        }
        catch (err) {
            this.logger.error(err);
            // Case where `errBuilder` is of type (error: Object) => string
            // If an object of another shape is passed to it, it would trigger some TypeError or cannot call .message of undefined
            return JSON.stringify(error);
        }
    }
    async processResGood({ opts, outputBuilder, stream, }, isFormURLEncoded, isJSON, isNDJSON, isSSE, isXML, response) {
        let payload;
        if (isNDJSON && stream) {
            if (!response.body) {
                throw new Error(ERR_STREAM_UNAVAILABLE);
            }
            await this.ndJSONStreamManager.exec({
                onData: async (data) => {
                    if (outputBuilder) {
                        stream.onData(await outputBuilder(data));
                    }
                    else {
                        stream.onData(data);
                    }
                },
                reader: response.body.getReader(),
            });
        }
        else if (isSSE && stream) {
            if (!response.body) {
                throw new Error(ERR_STREAM_UNAVAILABLE);
            }
            await this.sseStreamManager.exec({
                onData: async (data) => {
                    if (outputBuilder) {
                        stream.onData(await outputBuilder(data));
                    }
                    else {
                        stream.onData(data);
                    }
                },
                reader: response.body.getReader(),
            });
        }
        else if (isJSON) {
            payload = await response.json();
        }
        else {
            const asText = await response.text();
            this.logger.trace('HTTPAPICaller', {
                asText,
            });
            if (isFormURLEncoded) {
                payload = {};
                // TODO : Find a better way to do this (without adding any external dependency because the code must be portable)
                new URL(`http://localhost?${asText}`).searchParams.forEach((v, k) => {
                    // @ts-expect-error
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
    throwError(message, status) {
        if (isClientError(status)) {
            throw new IllegalArgumentError(message);
        }
        throw new Error(message);
    }
};
SimpleHTTPAPICaller = __decorate([
    injectable(),
    __param(0, inject('BufferManager')),
    __param(1, inject('HTTPAPICallExecutor')),
    __param(2, inject('HTTPAPICallExecutorAgentBuilder')),
    __param(3, inject(HTTPRequestBuilder)),
    __param(4, inject('Logger')),
    __param(5, inject(NDJSONStreamManager)),
    __param(6, inject(SSEStreamManager)),
    __param(7, inject('XMLManager')),
    __metadata("design:paramtypes", [Object, Object, Object, HTTPRequestBuilder, Object, NDJSONStreamManager,
        SSEStreamManager, Object])
], SimpleHTTPAPICaller);
export { SimpleHTTPAPICaller };
