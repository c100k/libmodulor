import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useDIContext } from '../lib/react/DIContextProvider.js';
import { UC_FORM_FIELD_ELEMENTS, validateFormField, } from '../lib/react/form.js';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
import { UCFormFieldControl } from './UCFormFieldControl.js';
import { UCFormFieldDesc } from './UCFormFieldDesc.js';
import { UCFormFieldErr } from './UCFormFieldErr.js';
import { UCFormFieldHelp } from './UCFormFieldHelp.js';
import { UCFormFieldLabel } from './UCFormFieldLabel.js';
export function UCFormField({ disabled, execState, f, only, }) {
    const { i18nManager } = useDIContext();
    const { formField } = useStyleContext();
    const [errMsg, setErrMsg] = useState(null);
    const onChange = () => {
        setErrMsg(validateFormField(i18nManager, f));
    };
    const elements = only ?? UC_FORM_FIELD_ELEMENTS;
    return (_jsxs("div", { className: formField?.className, style: formField?.style, children: [elements.includes('label') && _jsx(UCFormFieldLabel, { f: f }), elements.includes('control') && (_jsx(UCFormFieldControl, { disabled: disabled, execState: execState, f: f, onChange: onChange })), elements.includes('desc') && _jsx(UCFormFieldDesc, { f: f }), elements.includes('help') && _jsx(UCFormFieldHelp, { f: f }), elements.includes('err') && _jsx(UCFormFieldErr, { errMsg: errMsg })] }));
}
