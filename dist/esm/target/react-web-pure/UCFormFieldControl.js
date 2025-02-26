import React, {} from 'react';
import { UCInputFieldChangeOperator, ucifRepeatability, } from '../../uc/index.js';
import { htmlInputDef } from '../lib/web/input.js';
const CHECKED_FIELD_TYPES = ['checkbox', 'radio'];
const FILE_FIELD_TYPES = ['file'];
const MULTIPLE_VALUES_SEPARATOR = ',';
export function UCFormFieldControl({ errMsg = null, execState, f, onChange: onChangeBase, }) {
    const attrs = htmlInputDef(f, execState, errMsg);
    const onChange = (e) => {
        const target = e.currentTarget;
        const type = target.type;
        let value = target.value;
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
    return React.createElement("input", { ...attrs.spec, onChange: onChange });
}
