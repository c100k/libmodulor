import React, {} from 'react';
import { Pressable, Text } from 'react-native';
import { useDIContext } from '../lib/react/DIContextProvider.js';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCFormSubmitControl({ execState, disabled, onPress, uc, }) {
    const { wordingManager } = useDIContext();
    const { formSubmitControl } = useStyleContext();
    return (React.createElement(Pressable, { disabled: disabled, onPress: onPress },
        React.createElement(Text, { style: formSubmitControl?.style }, wordingManager.ucISubmit(uc.def, execState))));
}
