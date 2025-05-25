import React, { useRef } from 'react';
import { UCFormField } from './UCFormField.js';
import { UCFormSubmitControl } from './UCFormSubmitControl.js';
export function UCForm({ className, clearAfterExec, disabled, execState, onChange, onSubmit: onSubmitBase, uc, }) {
    const formRef = useRef(null);
    const onSubmit = async (e) => {
        e.preventDefault();
        const succeeded = await onSubmitBase();
        if (succeeded && clearAfterExec) {
            formRef.current?.reset();
        }
    };
    return (React.createElement("form", { className: className, onSubmit: onSubmit, ref: formRef },
        uc.inputFieldsForForm().map((f) => (React.createElement(UCFormField, { key: f.key, disabled: disabled, execState: execState, f: f, onChange: onChange }))),
        React.createElement(UCFormSubmitControl, { execState: execState, disabled: disabled, uc: uc })));
}
