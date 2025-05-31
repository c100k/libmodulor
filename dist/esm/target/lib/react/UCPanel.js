import React, { useState } from 'react';
import { ucIsDisabled, ucIsLoading, } from '../../../uc/index.js';
import { sleep } from '../../../utils/index.js';
import { useDIContext } from './DIContextProvider.js';
import { UCContainer } from './UCContainer.js';
import { useAction } from './useAction.js';
export function UCPanel({ autoExec = false, clearAfterExec = true, onDone, onError, onInit, onStartSubmitting, renderAutoExecLoader, renderForm, renderExecTouchable, sleepInMs, uc, }) {
    const { container } = useDIContext();
    const [ucManager] = useState(container.get('UCManager'));
    const { exec, execState } = useAction({
        action: async () => {
            const ucor = await ucManager.execClient(uc);
            await onDone?.(ucor);
            clear();
        },
        autoExec,
        confirm: async () => await ucManager.confirmClient(uc),
        onError,
        onInit: async () => await onInit?.(uc),
        onStart: async () => {
            // Is some targets, the confirmClient blocks the main thread (e.g. window.confirm()).
            // This leads to the state set above not being updated.
            // This is a "hacky" workaroud to let React re-render the control with 'submitting' state before
            await sleep(100);
            await onStartSubmitting?.();
        },
        sleepInMs,
    });
    const onChange = (f, op, v) => {
        f.setValue(op, v);
    };
    const clear = () => {
        if (!clearAfterExec) {
            return;
        }
        uc.clear();
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
            needsInputFilling &&
                renderForm({
                    ...ctx,
                    onChange,
                    onSubmit: exec,
                }),
            !needsInputFilling &&
                renderExecTouchable({
                    ...ctx,
                    onSubmit: exec,
                })))));
}
