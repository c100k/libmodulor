import type { ApiKey } from '../../dt/index.js';
import type { HTTPAPICaller } from '../HTTPAPICaller.js';
import type { LLMManager, LLMManagerSendOpts, LLMManagerSendReq, LLMManagerSendRes } from '../LLMManager.js';
import type { Configurable, Settings, SettingsManager } from '../SettingsManager.js';
export interface MistralAILLMManagerSettings extends Settings {
    mai_api_key: ApiKey;
}
type S = MistralAILLMManagerSettings;
export declare class MistralAILLMManager implements Configurable<S>, LLMManager {
    private httpAPICaller;
    private settingsManager;
    private static BASE_URL;
    constructor(httpAPICaller: HTTPAPICaller, settingsManager: SettingsManager<S>);
    s(): MistralAILLMManagerSettings;
    send(req: LLMManagerSendReq, opts?: LLMManagerSendOpts): Promise<LLMManagerSendRes>;
}
export {};
