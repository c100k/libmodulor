import type { Configurable, EnvironmentManager, Logger, SettingsManager, Worker } from '../../../std/index.js';
import type { ServerManagerSettings } from './ServerManager.js';
export type CSPDirectives = Record<string, null | string[]>;
interface Input {
    defaultDirectives: CSPDirectives;
}
interface Output {
    directives: CSPDirectives;
}
type S = Pick<ServerManagerSettings, 'server_csp_default_src' | 'server_csp_img_src' | 'server_csp_script_src'>;
export declare class CSPDirectivesBuilder implements Configurable<S>, Worker<Input, Output> {
    private environmentManager;
    private logger;
    private settingsManager;
    private static DEFAULT_SRC;
    private static IMG_SRC;
    private static SCRIPT_SRC;
    constructor(environmentManager: EnvironmentManager, logger: Logger, settingsManager: SettingsManager<S>);
    s(): S;
    exec({ defaultDirectives }: Input): Output;
}
export {};
