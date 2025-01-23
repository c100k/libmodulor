export interface PromptManagerPromptOpts<T extends string> {
    validate?: (value: T) => Promise<boolean>;
}
export interface PromptManager {
    prompt<T extends string>(invite: string, opts?: PromptManagerPromptOpts<T>): Promise<T>;
}
