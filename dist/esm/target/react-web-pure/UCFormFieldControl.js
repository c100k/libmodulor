import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TBoolean } from '../../dt/index.js';
import { ucifRepeatability } from '../../uc/index.js';
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
            f.clear();
            onChangeBase();
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
            f.setVal(valueArr);
            onChangeBase();
        }
        else {
            f.setVal(value);
            onChangeBase();
        }
    };
    const defaultChecked = attrs.internal?.checked;
    const defaultValue = attrs.internal?.value;
    if (attrs.internal?.multiline) {
        const { className, style } = styleDef(formFieldControl, 'textarea', 'default');
        return (_jsx("textarea", { ...attrs.spec, className: className, defaultValue: defaultValue, onChange: onChange, style: style }));
    }
    const { type } = f.def;
    if (type instanceof TBoolean) {
        const { className, style } = styleDef(formFieldControl, 'checkbox');
        return (_jsx("input", { ...attrs.spec, className: className, defaultChecked: defaultChecked, defaultValue: defaultValue, onChange: onChange, style: style }));
    }
    const options = type.getOptions();
    if (options) {
        // TODO : Handle type.hasStrictOptions() => display an input text alongside the select
        // TODO : Consider using a radio and/or checkbox and/or selectable buttons when the options count < X
        const { className, style } = styleDef(formFieldControl, 'select', 'default');
        return (_jsxs("select", { ...attrs.spec, className: className, defaultValue: defaultValue, onChange: onChange, style: style, children: [_jsx("option", {}), options.map((o) => (_jsx("option", { value: o.value.toString(), children: o.label }, o.value.toString())))] }));
    }
    const { className, style } = styleDef(formFieldControl, 'input', 'default');
    return (_jsx("input", { ...attrs.spec, className: className, defaultChecked: defaultChecked, defaultValue: defaultValue, onChange: onChange, style: style }));
}
