import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { UCInputFieldChangeOperator, ucifRepeatability, } from '../../uc/index.js';
import { isBlank } from '../../utils/index.js';
import { rnInputDef } from '../lib/rn/input.js';
const MULTIPLE_VALUES_SEPARATOR = ',';
export function UCFormFieldControl({ errMsg = null, execState, f, onChange: onChangeBase, }) {
    const [internalValue, setInternalValue] = useState(f.getValue());
    // biome-ignore lint/correctness/useExhaustiveDependencies: false positive : It is actually necessary (only `field` does not trigger the effect)
    useEffect(() => {
        setInternalValue(f.getValue());
    }, [f.getValue()]);
    const attrs = rnInputDef(f, execState, errMsg);
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
    let valueAsString = '';
    if (!isBlank(internalValue)) {
        if (Array.isArray(internalValue)) {
            valueAsString = internalValue.join(MULTIPLE_VALUES_SEPARATOR);
        }
        else {
            valueAsString = internalValue.toString();
        }
    }
    return (React.createElement(TextInput, { ...attrs.spec, onChangeText: onChangeText, value: valueAsString }));
}
