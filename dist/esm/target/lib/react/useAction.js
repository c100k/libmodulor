import { useEffect, useState } from 'react';
import { UCExecRes, UCExecState } from '../../../uc/index.js';
import { sleep } from '../../../utils/index.js';
export function useAction({ action, autoExec = false, confirm, onError, onInit, onStart, sleepInMs, }) {
    const [errMsg, setErrMsg] = useState(null);
    const [execRes, setExecRes] = useState(null);
    const [execState, setExecState] = useState(onInit ? UCExecState.INITIALIZING : UCExecState.IDLE);
    // biome-ignore lint/correctness/useExhaustiveDependencies : must run only once
    useEffect(() => {
        (async () => {
            if (execState === UCExecState.INITIALIZING) {
                await onInit?.();
            }
            if (autoExec) {
                await exec();
            }
            else {
                setExecState(UCExecState.IDLE);
            }
        })();
    }, []);
    const exec = async () => {
        setErrMsg(null);
        setExecRes(null);
        setExecState(UCExecState.SUBMITTING);
        await onStart?.();
        const confirmed = confirm ? await confirm?.() : true;
        if (!confirmed) {
            setExecState(UCExecState.IDLE);
            setExecRes(UCExecRes.ABORTED);
            return UCExecRes.ABORTED;
        }
        if (sleepInMs !== undefined) {
            await sleep(sleepInMs);
        }
        try {
            await action();
            setExecRes(UCExecRes.SUCCEEDED);
            return UCExecRes.SUCCEEDED;
        }
        catch (err) {
            setExecRes(UCExecRes.FAILED);
            if (onError) {
                await onError?.(err);
            }
            else {
                setErrMsg(err.message);
            }
            return UCExecRes.FAILED;
        }
        finally {
            setExecState(UCExecState.IDLE);
        }
    };
    return { errMsg, exec, execRes, execState };
}
