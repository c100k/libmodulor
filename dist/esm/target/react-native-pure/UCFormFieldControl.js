import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Switch, Text, TextInput, } from 'react-native';
import { TBoolean } from '../../dt/index.js';
import { UCInputFieldChangeOperator, ucifRepeatability, } from '../../uc/index.js';
import { isBlank } from '../../utils/index.js';
import { styleDef, useStyleContext, } from '../lib/react/StyleContextProvider.js';
import { rnInputDef } from '../lib/rn/input.js';
const MULTIPLE_VALUES_SEPARATOR = ',';
// TODO : Split this into smaller components
export function UCFormFieldControl({ errMsg = null, execState, f, onChange: onChangeBase, }) {
    const { colors, formFieldControl } = useStyleContext();
    const [internalValue, setInternalValue] = useState(f.getValue());
    // biome-ignore lint/correctness/useExhaustiveDependencies: false positive : It is actually necessary (only `f` does not trigger the effect)
    useEffect(() => {
        setInternalValue(f.getValue());
    }, [f.getValue()]);
    const onChangeText = (value) => {
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
        setInternalValue(value);
    };
    const onSelect = (value) => {
        if (internalValue === value) {
            onChangeBase(f, UCInputFieldChangeOperator.RESET, null);
            setInternalValue(null);
            return;
        }
        onChangeBase(f, UCInputFieldChangeOperator.SET, value);
        setInternalValue(value);
    };
    const onValueChange = (value) => {
        onChangeBase(f, UCInputFieldChangeOperator.SET, value);
        setInternalValue(value);
    };
    const attrs = rnInputDef(f, execState, errMsg);
    const { type } = f.def;
    const options = type.getOptions();
    if (options) {
        // TODO : Handle type.hasStrictOptions() => display an input text alongside the options
        // TODO : Consider using a picker when the options count > X
        return (React.createElement(FlatList, { data: options, horizontal: true, keyExtractor: (item) => item.value.toString(), renderItem: ({ item }) => (React.createElement(Pressable, { disabled: !attrs.spec?.editable, onPress: () => onSelect(item.value), style: [
                    styles.selectOption,
                    {
                        borderColor: item.value === internalValue
                            ? colors?.primary
                            : 'transparent',
                    },
                ] },
                React.createElement(Text, null, item.label))), showsHorizontalScrollIndicator: false, style: styles.select }));
    }
    // TODO : Implement picker for TFile (requires a dependency...)
    if (type instanceof TBoolean) {
        const { style } = styleDef(formFieldControl, 'Switch');
        return (React.createElement(Switch, { disabled: !attrs.spec?.editable, trackColor: { true: colors?.primary }, onValueChange: onValueChange, style: style, value: internalValue }));
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
    return (React.createElement(TextInput, { ...attrs.spec, onChangeText: onChangeText, style: style, value: valueAsString }));
}
const styles = StyleSheet.create({
    select: {
        flexGrow: 0, // Prevent the list from extending full height
    },
    selectOption: {
        padding: 2,
        borderWidth: 1,
    },
});
