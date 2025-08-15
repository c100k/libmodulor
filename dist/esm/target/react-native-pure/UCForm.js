import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View } from 'react-native';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
import { UCFormField } from './UCFormField.js';
import { UCFormSubmitControl } from './UCFormSubmitControl.js';
export function UCForm({ disabled, execState, onSubmit, uc, }) {
    const { form } = useStyleContext();
    const onPress = async () => {
        await onSubmit();
    };
    return (_jsxs(View, { style: form?.style, children: [uc.inputFieldsForForm().map((f) => (_jsx(UCFormField, { disabled: disabled, execState: execState, f: f }, f.key))), _jsx(UCFormSubmitControl, { disabled: disabled, execState: execState, onPress: onPress, uc: uc })] }));
}
