import type { FreeTextLong } from '../dt/index.js';
export type LLMManagerModel = string;
export type LLMManagerTemperature = number;
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
    temperature?: LLMManagerTemperature;
}
export interface LLMManagerSendRes {
    choices: {
        message: {
            content: string;
        };
    }[];
}
export interface LLMManager {
    send(req: LLMManagerSendReq): Promise<LLMManagerSendRes>;
}
