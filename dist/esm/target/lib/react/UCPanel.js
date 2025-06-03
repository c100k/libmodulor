import { Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ucIsDisabled, } from '../../../uc/index.js';
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
    const needsInputFilling = uc.needsInputFilling();
    const ctx = {
        clearAfterExec,
        disabled: ucIsDisabled(execState),
        execState,
        uc,
    };
    return (_jsxs(UCContainer, { uc: uc, children: [autoExec && ctx.disabled && renderAutoExecLoader(), !autoExec && (_jsxs(_Fragment, { children: [needsInputFilling &&
                        renderForm({
                            ...ctx,
                            onChange,
                            onSubmit: exec,
                        }), !needsInputFilling &&
                        renderExecTouchable({
                            ...ctx,
                            onSubmit: exec,
                        })] }))] }));
}
