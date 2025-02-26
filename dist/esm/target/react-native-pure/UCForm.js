import React, {} from 'react';
import { View } from 'react-native';
import { UCFormField } from './UCFormField.js';
import { UCFormSubmitControl } from './UCFormSubmitControl.js';
export function UCForm({ disabled, execState, onChange, onSubmit, uc, }) {
    const onPress = async () => {
        await onSubmit();
    };
    return (React.createElement(View, null,
        uc.inputFieldsForForm().map((f) => (React.createElement(View, { key: f.key },
            React.createElement(UCFormField, { disabled: disabled, execState: execState, f: f, onChange: onChange })))),
        React.createElement(UCFormSubmitControl, { execState: execState, disabled: disabled, onPress: onPress, uc: uc })));
}
