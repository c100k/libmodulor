import React, {} from 'react';
import { TBoolean } from '../../dt/index.js';
import { UCInputFieldChangeOperator, ucifRepeatability, } from '../../uc/index.js';
import { styleDef, useStyleContext, } from '../lib/react/StyleContextProvider.js';
import { htmlInputDef } from '../lib/web/input.js';
const CHECKED_FIELD_TYPES = ['checkbox', 'radio'];
const FILE_FIELD_TYPES = ['file'];
const MULTIPLE_VALUES_SEPARATOR = ',';
// TODO : Split this into smaller components
export function UCFormFieldControl({ disabled, errMsg = null, execState, f, onChange: onChangeBase, }) {
    const { formFieldControl, renderFormFieldControl } = useStyleContext();
    const component = renderFormFieldControl?.({
        disabled,
        errMsg,
        execState,
        f,
        onChange: onChangeBase,
    });
    if (component) {
        return component;
    }
    const attrs = htmlInputDef(f, disabled, errMsg);
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
    const defaultChecked = attrs.internal?.checked;
    const defaultValue = attrs.internal?.value;
    if (attrs.internal?.multiline) {
        const { className, style } = styleDef(formFieldControl, 'textarea', 'default');
        return (React.createElement("textarea", { ...attrs.spec, className: className, defaultValue: defaultValue, onChange: onChange, style: style }));
    }
    const { type } = f.def;
    if (type instanceof TBoolean) {
        const { className, style } = styleDef(formFieldControl, 'checkbox');
        return (React.createElement("input", { ...attrs.spec, className: className, defaultChecked: defaultChecked, defaultValue: defaultValue, onChange: onChange, style: style }));
    }
    const options = type.getOptions();
    if (options) {
        // TODO : Handle type.hasStrictOptions() => display an input text alongside the select
        // TODO : Consider using a radio and/or checkbox and/or selectable buttons when the options count < X
        const { className, style } = styleDef(formFieldControl, 'select', 'default');
        return (React.createElement("select", { ...attrs.spec, className: className, defaultValue: defaultValue, onChange: onChange, style: style },
            React.createElement("option", null),
            options.map((o) => (React.createElement("option", { key: o.value.toString(), value: o.value.toString() }, o.label)))));
    }
    const { className, style } = styleDef(formFieldControl, 'input', 'default');
    return (React.createElement("input", { ...attrs.spec, className: className, defaultChecked: defaultChecked, defaultValue: defaultValue, onChange: onChange, style: style }));
}
