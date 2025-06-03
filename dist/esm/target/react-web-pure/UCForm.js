import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
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
    return (_jsxs("form", { className: form?.className, onSubmit: onSubmit, ref: formRef, style: form?.style, children: [uc.inputFieldsForForm().map((f) => (_jsx(UCFormField, { disabled: disabled, execState: execState, f: f, onChange: onChange }, f.key))), _jsx(UCFormSubmitControl, { execState: execState, disabled: disabled, uc: uc })] }));
}
