import React, { useState } from 'react';
import { useDIContext } from '../lib/react/DIContextProvider.js';
import { UCFormFieldControl, } from './UCFormFieldControl.js';
import { UCFormFieldDesc } from './UCFormFieldDesc.js';
import { UCFormFieldErr } from './UCFormFieldErr.js';
import { UCFormFieldLabel, } from './UCFormFieldLabel.js';
const ELEMENTS = ['control', 'desc', 'err', 'label'];
export function UCFormField({ disabled, execState, field, onChange: onChangeBase, only, }) {
    const { i18nManager } = useDIContext();
    const { type } = field.def;
    const [errMsg, setErrMsg] = useState(null);
    const elements = only ?? ELEMENTS;
    const onChange = (f, op, v) => {
        setErrMsg(null);
        const vArr = Array.isArray(v) ? v : [v];
        for (const vv of vArr) {
            const validation = type.assign(vv).validate();
            const violation = validation.get();
            if (violation) {
                const [key, expected] = violation;
                setErrMsg(i18nManager.t(key, { vars: { expected } }));
                break;
            }
        }
        onChangeBase(f, op, v);
    };
    return (React.createElement(React.Fragment, null,
        elements.includes('label') && React.createElement(UCFormFieldLabel, { field: field }),
        elements.includes('control') && (React.createElement(UCFormFieldControl, { disabled: disabled, execState: execState, field: field, onChange: onChange })),
        elements.includes('err') && errMsg && (React.createElement(UCFormFieldErr, { errMsg: errMsg })),
        elements.includes('desc') && React.createElement(UCFormFieldDesc, { field: field })));
}
