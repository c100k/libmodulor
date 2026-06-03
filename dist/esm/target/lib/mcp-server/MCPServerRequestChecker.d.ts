import type { HTTPStatusNumber } from '../../../dt/index.js';
import type { Configurable, SettingsManager, Worker } from '../../../std/index.js';
import { JWTAuthenticationChecker } from '../server/JWTAuthenticationChecker.js';
import { PublicApiKeyChecker } from '../server/PublicApiKeyChecker.js';
import type { ServerManagerSettings } from '../server/ServerManager.js';
import type { ServerRequestHandlerReq } from '../server/ServerRequestHandler.js';
interface Input {
    req: ServerRequestHandlerReq;
}
interface Output {
    status: Extract<HTTPStatusNumber, 401> | null;
}
type S = Pick<ServerManagerSettings, 'server_mcp_dangerously_skip_auth_check' | 'server_mcp_dangerously_skip_pub_api_key_check' | 'server_public_api_key_header_name'>;
export declare class MCPServerRequestChecker implements Configurable<S>, Worker<Input, Promise<Output>> {
    private jwtAuthenticationChecker;
    private publicApiKeyChecker;
    private settingsManager;
    constructor(jwtAuthenticationChecker: JWTAuthenticationChecker, publicApiKeyChecker: PublicApiKeyChecker, settingsManager: SettingsManager<S>);
    s(): S;
    exec({ req }: Input): Promise<Output>;
}
export {};
