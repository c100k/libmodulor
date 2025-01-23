import type { PromptManager, PromptManagerPromptOpts } from '../PromptManager.js';
export declare class NodePromptManager implements PromptManager {
    prompt<T extends string>(invite: string, opts?: PromptManagerPromptOpts<T>): Promise<T>;
}
