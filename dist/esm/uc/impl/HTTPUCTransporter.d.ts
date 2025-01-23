import type { Configurable, HTTPAPICaller, SettingsManager } from '../../std/index.js';
import type { ServerClientManager, ServerClientManagerSettings } from '../../target/lib/client/ServerClientManager.js';
import type { UC } from '../UC.js';
import type { UCInput } from '../input.js';
import type { UCOPIBase } from '../opi.js';
import type { UCOutputOrNothing } from '../output.js';
import type { UCTransporter } from '../transporter.js';
type S = Pick<ServerClientManagerSettings, 'server_cookies_name_auth' | 'server_public_api_key_header_name'>;
export declare class HTTPUCTransporter implements Configurable<S>, UCTransporter {
    private httpAPICaller;
    private serverClientManager;
    private settingsManager;
    constructor(httpAPICaller: HTTPAPICaller, serverClientManager: ServerClientManager, settingsManager: SettingsManager<S>);
    s(): S;
    send<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>): Promise<UCOutputOrNothing<OPI0, OPI1>>;
}
export {};
