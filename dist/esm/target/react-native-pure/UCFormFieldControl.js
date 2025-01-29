import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { UCInputFieldChangeOperator, ucifRepeatability, } from '../../uc/index.js';
import { isBlank } from '../../utils/index.js';
import { rnInputDef } from '../lib/rn/input.js';
const MULTIPLE_VALUES_SEPARATOR = ',';
export function UCFormFieldControl({ errMsg = null, execState, field, onChange: onChangeBase, }) {
    const [internalValue, setInternalValue] = useState(field.getValue());
    useEffect(() => {
        setInternalValue(field.getValue());
    }, [field.getValue()]);
    const attrs = rnInputDef(field, execState, errMsg);
    const onChangeText = (value) => {
        const [isRepeatable] = ucifRepeatability(field.def);
        if (isRepeatable && typeof value === 'string') {
            const valueArr = value
                .split(MULTIPLE_VALUES_SEPARATOR)
                .map((v) => v.trim());
            onChangeBase(field, UCInputFieldChangeOperator.SET, valueArr);
        }
        else {
            onChangeBase(field, UCInputFieldChangeOperator.SET, value);
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
