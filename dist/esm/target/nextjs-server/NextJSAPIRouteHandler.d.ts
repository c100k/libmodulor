import { type NextRequest, NextResponse } from 'next/server.js';
import type { AppManifest } from '../../app/index.js';
import type { Worker } from '../../std/index.js';
import { UCBuilder, type UCDef, type UCInput, type UCManager, type UCOPIBase } from '../../uc/index.js';
import { ServerRequestHandler } from '../lib/server/ServerRequestHandler.js';
interface Input<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    appManifest: AppManifest;
    req: NextRequest;
    ucd: UCDef<I, OPI0, OPI1>;
}
interface Output {
    res: NextResponse;
}
export declare class NextJSAPIRouteHandler implements Worker<Input, Promise<Output>> {
    private serverRequestHandler;
    private ucBuilder;
    private ucManager;
    constructor(serverRequestHandler: ServerRequestHandler, ucBuilder: UCBuilder, ucManager: UCManager);
    exec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ appManifest, req, ucd }: Input<I, OPI0, OPI1>): Promise<Output>;
    private toReq;
    private toRes;
}
export {};
