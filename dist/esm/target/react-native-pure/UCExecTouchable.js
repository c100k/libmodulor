import { jsx as _jsx } from "react/jsx-runtime";
import { Pressable, Text } from 'react-native';
import { useDIContext } from '../lib/react/DIContextProvider.js';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCExecTouchable({ disabled, execState, onSubmit, uc, }) {
    const { wordingManager } = useDIContext();
    const { execTouchable } = useStyleContext();
    const label = wordingManager.ucISubmit(uc.def, execState);
    return (_jsx(Pressable, { disabled: disabled, onPress: onSubmit, children: _jsx(Text, { style: execTouchable?.style, children: label }) }));
}
