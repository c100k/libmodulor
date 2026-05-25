import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import type { Configurable, SettingsManager, Worker } from '../../../std/index.js';
import type { UCInput, UCOPIBase } from '../../../uc/index.js';
import type { ServerManagerSettings } from '../server/ServerManager.js';
import { ServerRequestHandler, type ServerRequestHandlerInput } from '../server/ServerRequestHandler.js';
type Input<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = Omit<ServerRequestHandlerInput<I, OPI0, OPI1>, 'dangerouslySkipAuthCheck' | 'dangerouslySkipPubApiKeyCheck' | 'skipSideEffects'>;
type Output = CallToolResult;
type S = Pick<ServerManagerSettings, 'server_mcp_dangerously_skip_auth_check' | 'server_mcp_dangerously_skip_pub_api_key_check'>;
export declare class MCPServerRequestHandler implements Configurable<S>, Worker<Input, Promise<Output>> {
    private serverRequestHandler;
    private settingsManager;
    constructor(serverRequestHandler: ServerRequestHandler, settingsManager: SettingsManager<S>);
    s(): S;
    exec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ appManifest, envelope, execOpts, req, res, ucd, ucManager, }: Input<I, OPI0, OPI1>): Promise<Output>;
}
export {};
