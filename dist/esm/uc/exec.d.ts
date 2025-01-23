export declare enum UCExecMode {
    AUTO = "auto",
    USER = "user"
}
export type UCExecState = 'changing' | 'idle' | 'initializing' | 'submitting';
export declare function ucIsDisabled(execState: UCExecState): boolean;
export declare function ucIsLoading(execState: UCExecState): boolean;
