import type { URL } from '../../dt/index.js';
import type { HTTPAPICaller } from '../HTTPAPICaller.js';
import type { LLMManager, LLMManagerSendReq, LLMManagerSendRes } from '../LLMManager.js';
import type { Configurable, Settings, SettingsManager } from '../SettingsManager.js';
/**
 * Unlike the "commercial" APIs, Ollama does not secure the API with an API key
 * @see https://github.com/ollama/ollama/issues/849
 */
export interface OllamaLLMManagerSettings extends Settings {
    oll_base_url: URL;
}
type S = OllamaLLMManagerSettings;
export declare class OllamaLLMManager implements Configurable<S>, LLMManager {
    private httpAPICaller;
    private settingsManager;
    constructor(httpAPICaller: HTTPAPICaller, settingsManager: SettingsManager<S>);
    s(): OllamaLLMManagerSettings;
    send(req: LLMManagerSendReq): Promise<LLMManagerSendRes>;
}
export {};
