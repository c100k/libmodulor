import type { ApiKey, FreeTextLong } from '../dt/index.js';
export type LLMManagerModel = string;
export type LLMManagerTemperature = number;
export interface LLMManagerSendOpts {
    /**
     * By default, each implementation reads the auth from the settings. If provided here, it takes precedence over the settings value.
     */
    auth?: {
        apiKey?: ApiKey;
    };
    onPartialOutput?: (chunk: LLMManagerSendRes) => void;
}
export interface LLMManagerSendReq {
    messages: {
        content: FreeTextLong;
        /**
         * In the case of OpenAI :
         * > With o1 models and newer, developer messages replace the previous system messages
         */
        role: 'assistant' | 'developer' | 'system' | 'user';
    }[];
    model: LLMManagerModel;
    stream?: boolean | undefined;
    temperature?: LLMManagerTemperature | undefined;
}
export interface LLMManagerSendRes {
    choices: {
        /**
         * Result chunk when stream is enabled
         */
        delta?: {
            content: string;
        };
        /**
         * Full result stream is not enabled
         */
        message?: {
            content: string;
        };
    }[];
}
export interface LLMManager {
    send(req: LLMManagerSendReq, opts?: LLMManagerSendOpts): Promise<LLMManagerSendRes>;
}
