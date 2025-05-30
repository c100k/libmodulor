import React, {} from 'react';
import { View } from 'react-native';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
import { UCFormField } from './UCFormField.js';
import { UCFormSubmitControl } from './UCFormSubmitControl.js';
export function UCForm({ disabled, execState, onChange, onSubmit, uc, }) {
    const { form } = useStyleContext();
    const onPress = async () => {
        await onSubmit();
    };
    return (React.createElement(View, { style: form?.style },
        uc.inputFieldsForForm().map((f) => (React.createElement(UCFormField, { disabled: disabled, execState: execState, f: f, key: f.key, onChange: onChange }))),
        React.createElement(UCFormSubmitControl, { execState: execState, disabled: disabled, onPress: onPress, uc: uc })));
}
