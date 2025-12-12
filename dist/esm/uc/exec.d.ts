import type { EnumOf } from '../utils/index.js';
/**
 * Mode of execution of a use case
 */
export declare const UCExecMode: {
    /**
     * The use case has been executed programmatically
     */
    readonly AUTO: "auto";
    /**
     * The use case has been executed explicitly by a user
     */
    readonly USER: "user";
};
export type UCExecMode = EnumOf<typeof UCExecMode>;
/**
 * Result of execution of a use case
 */
export declare const UCExecRes: {
    /**
     * The user aborted the exec (e.g. by not confirming)
     */
    readonly ABORTED: "aborted";
    /**
     * The execution failed
     */
    readonly FAILED: "failed";
    /**
     * The execution succeeded
     */
    readonly SUCCEEDED: "succeeded";
};
export type UCExecRes = EnumOf<typeof UCExecRes>;
/**
 * State of execution of a use case
 * It applies to a form, but it can be applied and generalized to any other interaction mechanism (i.e. cli, voice...).
 */
export declare const UCExecState: {
    /**
     * An action triggered a change, fields should be disabled
     */
    readonly CHANGING: "changing";
    /**
     * It can be touched and filled by the user
     */
    readonly IDLE: "idle";
    /**
     * It's initializing in some way, fields should be disabled
     */
    readonly INITIALIZING: "initializing";
    /**
     * It's submitting, fields should be disabled and some indicator should show the processing
     */
    readonly SUBMITTING: "submitting";
};
export type UCExecState = EnumOf<typeof UCExecState>;
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
 * Typically, this is used to show a `loading` indicator. Thus, it's `true` when `execState === UCExecState.SUBMITTING`.
 * Note that it's not for `UCExecState.CHANGING` or `UCExecState.INITIALIZING` because these are not triggered by the user per sé.
 *
 * @param execState
 * @returns
 */
export declare function ucIsLoading(execState: UCExecState): boolean;
/**
 * Check whether the execution corresponds to an "error" result
 *
 * @param execRes
 * @returns
 */
export declare function ucIsOnErr(execRes: UCExecRes | null): boolean;
