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
import { cookies, headers } from 'next/headers.js';
import { redirect } from 'next/navigation.js';
import { NextResponse } from 'next/server.js';
import { UCBuilder, ucHTTPContract, } from '../../uc/index.js';
import { fromFormData, fromQueryParams } from '../../utils/index.js';
import { ServerRequestHandler, } from '../lib/server/ServerRequestHandler.js';
let NextJSAPIRouteHandler = class NextJSAPIRouteHandler {
    serverRequestHandler;
    ucBuilder;
    ucManager;
    constructor(serverRequestHandler, ucBuilder, ucManager) {
        this.serverRequestHandler = serverRequestHandler;
        this.ucBuilder = ucBuilder;
        this.ucManager = ucManager;
    }
    async exec({ appManifest, req, ucd }) {
        const uc = this.ucBuilder.exec({ appManifest, auth: null, def: ucd });
        const { envelope } = ucHTTPContract(uc);
        const { body, status } = await this.serverRequestHandler.exec({
            appManifest,
            envelope,
            req: this.toReq(req),
            res: this.toRes(),
            ucd,
            ucManager: this.ucManager,
        });
        if (!body) {
            return {
                res: new NextResponse(null, { status }),
            };
        }
        return {
            res: NextResponse.json(body, { status }),
        };
    }
    toReq(req) {
        return {
            bodyFromFormData: async () => fromFormData(await req.formData()),
            bodyFromJSON: () => req.json(),
            bodyFromQueryParams: async () => fromQueryParams(req.nextUrl),
            bodyRaw: req.body,
            cookie: async (name) => (await cookies()).get(name)?.value,
            header: async (name) => (await headers()).get(name) ?? undefined,
            method: req.method,
            secure: req.url.startsWith('https://'),
            url: req.url,
        };
    }
    toRes() {
        return {
            clearCookie: async (name) => {
                (await cookies()).delete(name);
            },
            redirect: (location) => redirect(location),
            setCookie: async ({ name, opts, val }) => {
                (await cookies()).set(name, val, opts);
            },
        };
    }
};
NextJSAPIRouteHandler = __decorate([
    injectable(),
    __param(0, inject(ServerRequestHandler)),
    __param(1, inject(UCBuilder)),
    __param(2, inject('UCManager')),
    __metadata("design:paramtypes", [ServerRequestHandler,
        UCBuilder, Object])
], NextJSAPIRouteHandler);
export { NextJSAPIRouteHandler };
