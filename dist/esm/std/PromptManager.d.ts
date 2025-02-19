export interface PromptManagerPromptOpts<T extends string> {
    /**
     * Predicate to validate the input
     *
     * It keeps asking while the value is not valid, unless the user presses `Ctrl+C`.
     *
     * @param value
     * @returns
     */
    validate?: (value: T) => Promise<boolean>;
}
export interface PromptManager {
    prompt<T extends string>(invite: string, opts?: PromptManagerPromptOpts<T>): Promise<T>;
}
