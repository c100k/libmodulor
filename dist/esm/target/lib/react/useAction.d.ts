import type { ErrorMessage, UIntDuration } from '../../../dt/index.js';
import { UCExecRes, UCExecState } from '../../../uc/index.js';
export type UseActionAction = () => Promise<void>;
export type UseActionConfirm = () => Promise<boolean>;
export type UseActionExec = () => Promise<UCExecRes>;
export type UseActionOnError = (err: Error) => Promise<void>;
export type UseActionOnInit = () => Promise<void>;
export type UseActionOnStart = () => Promise<void>;
export interface UseActionOpts {
    action: UseActionAction;
    autoExec?: boolean;
    confirm?: UseActionConfirm;
    onError?: UseActionOnError | undefined;
    onInit?: UseActionOnInit;
    onStart?: UseActionOnStart;
    sleepInMs?: UIntDuration | undefined;
}
export interface UseActionRes {
    errMsg: ErrorMessage | null;
    exec: UseActionExec;
    execRes: UCExecRes | null;
    execState: UCExecState;
}
export declare function useAction({ action, autoExec, confirm, onError, onInit, onStart, sleepInMs, }: UseActionOpts): UseActionRes;
