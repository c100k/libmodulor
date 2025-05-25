import React, { useState } from 'react';
import { useDIContext } from '../lib/react/DIContextProvider.js';
import { UC_FORM_FIELD_ELEMENTS, validateFormField, } from '../lib/react/form.js';
import { UCFormFieldControl } from './UCFormFieldControl.js';
import { UCFormFieldDesc } from './UCFormFieldDesc.js';
import { UCFormFieldErr } from './UCFormFieldErr.js';
import { UCFormFieldLabel } from './UCFormFieldLabel.js';
export function UCFormField({ className, disabled, execState, f, onChange: onChangeBase, only, }) {
    const { i18nManager } = useDIContext();
    const [errMsg, setErrMsg] = useState(null);
    const onChange = (f, op, v) => {
        setErrMsg(validateFormField(i18nManager, f, v));
        onChangeBase(f, op, v);
    };
    const elements = only ?? UC_FORM_FIELD_ELEMENTS;
    return (React.createElement("div", { className: className },
        elements.includes('label') && React.createElement(UCFormFieldLabel, { f: f }),
        elements.includes('control') && (React.createElement(UCFormFieldControl, { disabled: disabled, execState: execState, f: f, onChange: onChange })),
        elements.includes('err') && errMsg && (React.createElement(UCFormFieldErr, { errMsg: errMsg })),
        elements.includes('desc') && React.createElement(UCFormFieldDesc, { f: f })));
}
