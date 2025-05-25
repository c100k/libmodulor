import type { ApiKey } from '../../dt/index.js';
import type { HTTPAPICaller } from '../HTTPAPICaller.js';
import type { LLMManager, LLMManagerSendOpts, LLMManagerSendReq, LLMManagerSendRes } from '../LLMManager.js';
import type { Configurable, Settings, SettingsManager } from '../SettingsManager.js';
export interface OpenAILLMManagerSettings extends Settings {
    oai_api_key: ApiKey;
}
type S = OpenAILLMManagerSettings;
export declare class OpenAILLMManager implements Configurable<S>, LLMManager {
    private httpAPICaller;
    private settingsManager;
    private static BASE_URL;
    constructor(httpAPICaller: HTTPAPICaller, settingsManager: SettingsManager<S>);
    s(): OpenAILLMManagerSettings;
    send(req: LLMManagerSendReq, opts?: LLMManagerSendOpts): Promise<LLMManagerSendRes>;
}
export {};
