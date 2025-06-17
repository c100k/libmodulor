import { type Context, type Handler, Hono } from 'hono';
import type { AppManifest } from '../../../app/index.js';
import type { UCDef, UCHTTPContract, UCInput, UCManager, UCOPIBase } from '../../../uc/index.js';
import type { ServerRequestHandler, ServerRequestHandlerReq, ServerRequestHandlerRes } from '../server/ServerRequestHandler.js';
export declare function buildHandler<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(appManifest: AppManifest, ucd: UCDef<I, OPI0, OPI1>, contract: UCHTTPContract, serverRequestHandler: ServerRequestHandler, ucManager: UCManager): Handler;
export declare function init(): Hono;
export declare function mountHandler(contract: UCHTTPContract, hono: Hono, handler: Handler): void;
export declare function toReq(c: Context): ServerRequestHandlerReq;
export declare function toRes(c: Context): ServerRequestHandlerRes;
