import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import type { Worker } from '../../../std/index.js';
import type { UCInput, UCOPIBase } from '../../../uc/index.js';
import { ServerRequestHandler, type ServerRequestHandlerInput } from '../server/ServerRequestHandler.js';
type Input<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = Omit<ServerRequestHandlerInput<I, OPI0, OPI1>, 'skipSideEffects'>;
type Output = CallToolResult;
export declare class MCPServerRequestHandler implements Worker<Input, Promise<Output>> {
    private serverRequestHandler;
    constructor(serverRequestHandler: ServerRequestHandler);
    exec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ appManifest, envelope, execOpts, req, res, ucd, ucManager, }: Input<I, OPI0, OPI1>): Promise<Output>;
}
export {};
