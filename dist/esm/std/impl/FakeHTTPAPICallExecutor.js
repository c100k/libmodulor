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
import { FetchHTTPAPICallExecutor } from './FetchHTTPAPICallExecutor.js';
let FakeHTTPAPICallExecutor = class FakeHTTPAPICallExecutor {
    fetchHTTPAPICallExecutor;
    entries;
    constructor(fetchHTTPAPICallExecutor) {
        this.fetchHTTPAPICallExecutor = fetchHTTPAPICallExecutor;
        this.entries = new Map();
    }
    fn() {
        return async (url, info) => {
            if (url.toString().startsWith('http://localhost')) {
                return this.fetchHTTPAPICallExecutor.fn()(url, info);
            }
            const key = (typeof url === 'string' ? url : url.toString());
            const content = this.entries.get(key);
            if (!content) {
                const message = `Endpoint ${url} not defined in FakeHTTPAPICallExecutor.entries`;
                return {
                    arrayBuffer: async () => Buffer.from(''),
                    body: {
                        readable: true,
                    },
                    headers: {
                        entries: () => [
                            ['Content-Type', 'application/json'],
                        ].values(),
                        get: (_) => 'application/json',
                    },
                    json: async () => ({ message }),
                    ok: false,
                    redirected: false,
                    status: 404,
                    text: async () => message,
                };
            }
            return {
                arrayBuffer: async () => Buffer.from(content),
                body: {
                    readable: true,
                },
                headers: {
                    entries: () => [
                        ['Content-Type', 'application/json'],
                    ].values(),
                    get: (_) => 'application/json',
                },
                json: async () => JSON.parse(content),
                ok: true,
                redirected: false,
                status: 200,
                text: async () => content,
            };
        };
    }
};
FakeHTTPAPICallExecutor = __decorate([
    injectable(),
    __param(0, inject(FetchHTTPAPICallExecutor)),
    __metadata("design:paramtypes", [FetchHTTPAPICallExecutor])
], FakeHTTPAPICallExecutor);
export { FakeHTTPAPICallExecutor };
