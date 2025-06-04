import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { View } from 'react-native';
import { useDIContext } from '../lib/react/DIContextProvider.js';
import { UC_FORM_FIELD_ELEMENTS, validateFormField, } from '../lib/react/form.js';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
import { UCFormFieldControl } from './UCFormFieldControl.js';
import { UCFormFieldDesc } from './UCFormFieldDesc.js';
import { UCFormFieldErr } from './UCFormFieldErr.js';
import { UCFormFieldLabel } from './UCFormFieldLabel.js';
export function UCFormField({ disabled, execState, f, onChange: onChangeBase, only, }) {
    const { i18nManager } = useDIContext();
    const { formField } = useStyleContext();
    const [errMsg, setErrMsg] = useState(null);
    const onChange = (f, op, v) => {
        setErrMsg(validateFormField(i18nManager, f, v));
        onChangeBase(f, op, v);
    };
    const elements = only ?? UC_FORM_FIELD_ELEMENTS;
    return (_jsxs(View, { style: formField?.style, children: [elements.includes('label') && _jsx(UCFormFieldLabel, { f: f }), elements.includes('control') && (_jsx(UCFormFieldControl, { disabled: disabled, execState: execState, f: f, onChange: onChange })), elements.includes('err') && errMsg && (_jsx(UCFormFieldErr, { errMsg: errMsg })), elements.includes('desc') && _jsx(UCFormFieldDesc, { f: f })] }));
}
