import { jsx as _jsx } from "react/jsx-runtime";
import { Pressable, Text } from 'react-native';
import { useDIContext } from '../lib/react/DIContextProvider.js';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCFormSubmitControl({ execState, disabled, onPress, uc, }) {
    const { wordingManager } = useDIContext();
    const { formSubmitControl } = useStyleContext();
    return (_jsx(Pressable, { disabled: disabled, onPress: onPress, children: _jsx(Text, { style: formSubmitControl?.style, children: wordingManager.ucISubmit(uc.def, execState) }) }));
}
