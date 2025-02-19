import React, { useEffect, useState } from 'react';
import { ucIsDisabled, ucIsLoading, } from '../../../uc/index.js';
import { sleep } from '../../../utils/index.js';
import { useDIContext } from './DIContextProvider.js';
import { UCContainer } from './UCContainer.js';
export function UCPanel({ autoExec = false, clearAfterExec = true, onDone, onError, onInit, onStartSubmitting, renderAutoExecLoader, renderForm, renderExecTouchable, sleepInMs, uc, }) {
    const { container } = useDIContext();
    const [ucManager] = useState(container.get('UCManager'));
    const [execState, setExecState] = useState(onInit ? 'initializing' : 'idle');
    useEffect(() => {
        if (!autoExec) {
            return;
        }
        onSubmit();
    }, [autoExec]);
    useEffect(() => {
        if (execState !== 'initializing') {
            return;
        }
        (async () => {
            await onInit?.(uc);
            setExecState('idle');
        })();
    }, [execState, onInit, uc]);
    const onChange = (f, op, v) => {
        f.setValue(op, v);
    };
    const clear = () => {
        if (!clearAfterExec) {
            return;
        }
        uc.clear();
    };
    const onSubmit = async () => {
        setExecState('submitting');
        // Is some targets, the confirmClient blocks the main thread (e.g. window.confirm()).
        // This leads to the state set above not being updated.
        // This is a "hacky" workaroud to let React re-render the control with 'submitting' state before
        await sleep(100);
        await onStartSubmitting?.();
        const confirmed = await ucManager.confirmClient(uc);
        if (!confirmed) {
            setExecState('idle');
            return false;
        }
        if (sleepInMs !== undefined) {
            await sleep(sleepInMs);
        }
        try {
            const ucor = await ucManager.execClient(uc);
            await onDone?.(ucor);
            clear();
            return true;
        }
        catch (err) {
            if (!onError) {
                throw err;
            }
            onError(err);
            return false;
        }
        finally {
            setExecState('idle');
        }
    };
    const disabled = ucIsDisabled(execState);
    const loading = ucIsLoading(execState);
    // TODO : Keep these as a state to avoid recomputation
    const ctx = {
        clearAfterExec,
        disabled,
        execState,
        uc,
    };
    const needsInputFilling = uc.needsInputFilling();
    return (React.createElement(UCContainer, { uc: uc },
        autoExec && loading && renderAutoExecLoader(),
        !autoExec && (React.createElement(React.Fragment, null,
            !needsInputFilling &&
                renderExecTouchable({
                    ...ctx,
                    onSubmit,
                }),
            needsInputFilling &&
                renderForm({
                    ...ctx,
                    onChange,
                    onSubmit,
                })))));
}
