/**
 * Mode of execution of a use case
 */
export const UCExecMode = {
    /**
     * The use case has been executed programmatically
     */
    AUTO: 'auto',
    /**
     * The use case has been executed explicitly by a user
     */
    USER: 'user',
};
/**
 * Result of execution of a use case
 */
export const UCExecRes = {
    /**
     * The user aborted the exec (e.g. by not confirming)
     */
    ABORTED: 'aborted',
    /**
     * The execution failed
     */
    FAILED: 'failed',
    /**
     * The execution succeeded
     */
    SUCCEEDED: 'succeeded',
};
/**
 * State of execution of a use case
 * It applies to a form, but it can be applied and generalized to any other interaction mechanism (i.e. cli, voice...).
 */
export const UCExecState = {
    /**
     * An action triggered a change, fields should be disabled
     */
    CHANGING: 'changing',
    /**
     * It can be touched and filled by the user
     */
    IDLE: 'idle',
    /**
     * It's initializing in some way, fields should be disabled
     */
    INITIALIZING: 'initializing',
    /**
     * It's submitting, fields should be disabled and some indicator should show the processing
     */
    SUBMITTING: 'submitting',
};
/**
 * Check whether the execution corresponds to a "disabled" state
 *
 * Typically, this is used in a form to derive the `disabled` attribute.
 *
 * @param execState
 * @returns
 */
export function ucIsDisabled(execState) {
    return execState !== UCExecState.IDLE;
}
/**
 * Check whether the execution corresponds to a "loading" state
 *
 * Typically, this is used to show a `loading` indicator. Thus, it's `true` when `execState === UCExecState.SUBMITTING`.
 * Note that it's not for `UCExecState.CHANGING` or `UCExecState.INITIALIZING` because these are not triggered by the user per sé.
 *
 * @param execState
 * @returns
 */
export function ucIsLoading(execState) {
    return execState === UCExecState.SUBMITTING;
}
/**
 * Check whether the execution corresponds to an "error" result
 *
 * @param execRes
 * @returns
 */
export function ucIsOnErr(execRes) {
    return execRes === UCExecRes.FAILED;
}
