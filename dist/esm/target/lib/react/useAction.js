import { useEffect, useState } from 'react';
import { sleep } from '../../../utils/index.js';
export function useAction({ action, autoExec = false, confirm, onError, onInit, onStart, sleepInMs, }) {
    const [errMsg, setErrMsg] = useState(null);
    const [execRes, setExecRes] = useState(null);
    const [execState, setExecState] = useState(onInit ? 'initializing' : 'idle');
    useEffect(() => {
        if (execState !== 'initializing') {
            return;
        }
        (async () => {
            await onInit?.();
            setExecState('idle');
        })();
    }, [execState, onInit]);
    const exec = async () => {
        setErrMsg(null);
        setExecRes(null);
        setExecState('submitting');
        await onStart?.();
        const confirmed = confirm ? await confirm?.() : true;
        if (!confirmed) {
            setExecState('idle');
            setExecRes('aborted');
            return 'aborted';
        }
        if (sleepInMs !== undefined) {
            await sleep(sleepInMs);
        }
        try {
            await action();
            setExecRes('succeeded');
            return 'succeeded';
        }
        catch (err) {
            setExecRes('failed');
            if (onError) {
                await onError?.(err);
            }
            else {
                setErrMsg(err.message);
            }
            return 'failed';
        }
        finally {
            setExecState('idle');
        }
    };
    // biome-ignore lint/correctness/useExhaustiveDependencies(exec): it complains if I add it AND if I don't add it !
    useEffect(() => {
        if (!autoExec) {
            return;
        }
        exec();
    }, [autoExec]);
    return { errMsg, exec, execRes, execState };
}
