import React, {} from 'react';
import { UCInputFieldChangeOperator, ucifRepeatability, } from '../../uc/index.js';
import { htmlInputDef } from '../lib/web/input.js';
const CHECKED_FIELD_TYPES = ['checkbox', 'radio'];
const FILE_FIELD_TYPES = ['file'];
const MULTIPLE_VALUES_SEPARATOR = ',';
export function UCFormFieldControl({ className, errMsg = null, execState, f, onChange: onChangeBase, }) {
    const attrs = htmlInputDef(f, execState, errMsg, className);
    const onChange = (e) => {
        const target = e.currentTarget;
        const type = target.type;
        let value = target.value;
        if (target.localName === 'select' && !value) {
            // Prevent the value from being '' when we set/unset the select
            // Otherwise it sets '' as value and prevents the form for being valid
            onChangeBase(f, UCInputFieldChangeOperator.RESET, value);
            return;
        }
        if (CHECKED_FIELD_TYPES.includes(type) && 'checked' in target) {
            value = target.checked;
        }
        else if (FILE_FIELD_TYPES.includes(type) && 'files' in target) {
            value = target.files?.item(0);
        }
        const [isRepeatable] = ucifRepeatability(f.def);
        if (isRepeatable && typeof value === 'string') {
            const valueArr = value
                .split(MULTIPLE_VALUES_SEPARATOR)
                .map((v) => v.trim());
            onChangeBase(f, UCInputFieldChangeOperator.SET, valueArr);
        }
        else {
            onChangeBase(f, UCInputFieldChangeOperator.SET, value);
        }
    };
    if (attrs.internal?.multiline) {
        return React.createElement("textarea", { ...attrs.spec, onChange: onChange });
    }
    const { type } = f.def;
    const options = type.getOptions();
    if (options) {
        // TODO : Handle type.hasStrictOptions() => display an input text alongside the select
        // TODO : Consider using a radio and/or checkbox and/or selectable buttons when the options count < X
        return (React.createElement("select", { ...attrs.spec, onChange: onChange },
            React.createElement("option", null),
            options.map((o) => (React.createElement("option", { key: o.value.toString(), value: o.value.toString() }, o.label)))));
    }
    return React.createElement("input", { ...attrs.spec, onChange: onChange });
}
