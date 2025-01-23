import type { CookieOptions } from 'express';
import type { JWT } from '../../../dt/index.js';
import type { JWTManager, SettingsManager, Worker } from '../../../std/index.js';
import type { ServerManagerSettings } from '../../lib/server/ServerManager.js';
interface Input {
    jwt: JWT;
}
interface Output {
    name: string;
    opts: CookieOptions;
    val: JWT;
}
type S = Pick<ServerManagerSettings, 'server_cookies_http_only' | 'server_cookies_name_auth' | 'server_cookies_same_site' | 'server_cookies_secure'>;
export declare class AuthCookieCreator implements Worker<Input, Promise<Output>> {
    private jwtManager;
    private settingsManager;
    constructor(jwtManager: JWTManager, settingsManager: SettingsManager<S>);
    s(): S;
    exec({ jwt }: Input): Promise<Output>;
}
export {};
