import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Switch, Text, TextInput, } from 'react-native';
import { TBoolean, TFile } from '../../dt/index.js';
import { ucifRepeatability } from '../../uc/index.js';
import { isBlank } from '../../utils/index.js';
import { styleDef, useStyleContext, } from '../lib/react/StyleContextProvider.js';
import { rnInputDef } from '../lib/rn/input.js';
const MULTIPLE_VALUES_SEPARATOR = ',';
// TODO : Split this into smaller components
export function UCFormFieldControl({ disabled, errMsg = null, execState, f, onChange: onChangeBase, }) {
    const { colors, formFieldControl, renderFormFieldControl } = useStyleContext();
    const [internalValue, setInternalValue] = useState(f.getValue());
    // biome-ignore lint/correctness/useExhaustiveDependencies: It is actually necessary because only `f` or `f.getValue` does not trigger the effect
    useEffect(() => {
        setInternalValue(f.getValue());
    }, [f.getValue()]);
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
    const { type } = f.def;
    if (type instanceof TFile) {
        return (_jsx(Text, { style: { color: 'red' }, children: "Generic file picker not available in RN" }));
    }
    const onChangeText = (value) => {
        const [isRepeatable] = ucifRepeatability(f.def);
        if (isRepeatable && typeof value === 'string') {
            const valueArr = value
                .split(MULTIPLE_VALUES_SEPARATOR)
                .map((v) => v.trim());
            f.setVal(valueArr);
            onChangeBase();
            setInternalValue(valueArr);
        }
        else {
            f.setVal(value);
            onChangeBase();
            setInternalValue(value);
        }
    };
    const onSelect = (value) => {
        if (internalValue === value) {
            f.clear();
            onChangeBase();
            setInternalValue(null);
            return;
        }
        f.setVal(value);
        onChangeBase();
        setInternalValue(value);
    };
    const onValueChange = (value) => {
        f.setVal(value);
        onChangeBase();
        setInternalValue(value);
    };
    const attrs = rnInputDef(f, disabled, errMsg);
    const options = type.getOptions();
    if (options) {
        // TODO : Handle type.hasStrictOptions() => display an input text alongside the options
        // TODO : Consider using a picker when the options count > X
        return (_jsx(FlatList, { data: options, horizontal: true, keyExtractor: (item) => item.value.toString(), renderItem: ({ item }) => (_jsx(Pressable, { disabled: !attrs.spec?.editable, onPress: () => onSelect(item.value), style: [
                    styles.selectOption,
                    {
                        borderColor: item.value === internalValue
                            ? colors?.primary
                            : 'transparent',
                    },
                ], children: _jsx(Text, { children: item.label }) })), showsHorizontalScrollIndicator: false, style: styles.select }));
    }
    if (type instanceof TBoolean) {
        const { style } = styleDef(formFieldControl, 'Switch');
        return (_jsx(Switch, { disabled: !attrs.spec?.editable, onValueChange: onValueChange, style: style, trackColor: { true: colors?.primary }, value: internalValue }));
    }
    let valueAsString = '';
    if (!isBlank(internalValue)) {
        if (Array.isArray(internalValue)) {
            valueAsString = internalValue.join(MULTIPLE_VALUES_SEPARATOR);
        }
        else {
            valueAsString = internalValue.toString();
        }
    }
    const { style } = styleDef(formFieldControl, 'TextInput', 'default');
    return (_jsx(TextInput, { ...attrs.spec, onChangeText: onChangeText, style: style, value: valueAsString }));
}
const styles = StyleSheet.create({
    select: {
        flexGrow: 0, // Prevent the list from extending full height
    },
    selectOption: {
        borderWidth: 1,
        padding: 2,
    },
});
