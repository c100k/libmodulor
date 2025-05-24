/**
 * Mode of execution of a use case
 *
 * Unlike all the other enums, the values are lowercased for compatibility reasons.
 * Indeed, this value is persisted in the database so we need to support all existing deployments.
 */
export var UCExecMode;
(function (UCExecMode) {
    /**
     * The use case has been executed programmatically
     */
    UCExecMode["AUTO"] = "auto";
    /**
     * The use case has been executed explicitly by a user
     */
    UCExecMode["USER"] = "user";
})(UCExecMode || (UCExecMode = {}));
/**
 * Check whether the execution corresponds to a "disabled" state
 *
 * Typically, this is used in a form to derive the `disabled` attribute.
 *
 * @param execState
 * @returns
 */
export function ucIsDisabled(execState) {
    return execState !== 'idle';
}
/**
 * Check whether the execution corresponds to a "loading" state
 *
 * Typically, this is used to show a `loading` indicator. Thus, it's `true` when `execState === 'submitting'`.
 * Note that it's not for `changing` or `initializing` because these are not triggered by the user per sé.
 *
 * @param execState
 * @returns
 */
export function ucIsLoading(execState) {
    return execState === 'submitting';
}
/**
 * Check whether the execution corresponds to an "error" result
 *
 * @param execRes
 * @returns
 */
export function ucIsOnErr(execRes) {
    return execRes === 'failed';
}
