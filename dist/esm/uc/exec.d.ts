/**
 * Mode of execution of a use case
 *
 * Unlike all the other enums, the values are lowercased for compatibility reasons.
 * Indeed, this value is persisted in the database so we need to support all existing deployments.
 */
export declare enum UCExecMode {
    /**
     * The use case has been executed programmatically
     */
    AUTO = "auto",
    /**
     * The use case has been executed explicitly by a user
     */
    USER = "user"
}
/**
 * State of execution of a use case
 *
 * - `changing`     : An action triggered a change, fields should be disabled
 * - `idle`         : It can be touched and filled by the user
 * - `initializing` : It's initializing in some way, fields should be disabled
 * - `submitting`   : It's submitting, fields should be disabled and some indicator should show the processing
 *
 * It applies to a form, but it can be applied and generalized to any other interaction mechanism (i.e. cli, voice...).
 */
export type UCExecState = 'changing' | 'idle' | 'initializing' | 'submitting';
/**
 * Check whether the execution corresponds to a "disabled" state
 *
 * Typically, this is used in a form to derive the `disabled` attribute.
 *
 * @param execState
 * @returns
 */
export declare function ucIsDisabled(execState: UCExecState): boolean;
/**
 * Check whether the execution corresponds to a "loading" state
 *
 * Typically, this is used to show a `loading` indicator. Thus, it's `true` when `execState === 'submitting'`.
 * Note that it's not for `changing` or `initializing` because these are not triggered by the user per sé.
 *
 * @param execState
 * @returns
 */
export declare function ucIsLoading(execState: UCExecState): boolean;
