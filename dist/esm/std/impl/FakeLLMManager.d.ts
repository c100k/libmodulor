import type { LLMManager, LLMManagerSendOpts, LLMManagerSendReq, LLMManagerSendRes } from '../LLMManager.js';
export declare class FakeLLMManager implements LLMManager {
    send(req: LLMManagerSendReq, opts?: LLMManagerSendOpts): Promise<LLMManagerSendRes>;
}
