import React, { useRef } from 'react';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
import { UCFormField } from './UCFormField.js';
import { UCFormSubmitControl } from './UCFormSubmitControl.js';
export function UCForm({ clearAfterExec, disabled, execState, onChange, onSubmit: onSubmitBase, uc, }) {
    const { form } = useStyleContext();
    const formRef = useRef(null);
    const onSubmit = async (e) => {
        e.preventDefault();
        const succeeded = await onSubmitBase();
        if (succeeded && clearAfterExec) {
            formRef.current?.reset();
        }
    };
    return (React.createElement("form", { className: form?.className, onSubmit: onSubmit, ref: formRef, style: form?.style },
        uc.inputFieldsForForm().map((f) => (React.createElement(UCFormField, { key: f.key, disabled: disabled, execState: execState, f: f, onChange: onChange }))),
        React.createElement(UCFormSubmitControl, { execState: execState, disabled: disabled, uc: uc })));
}
