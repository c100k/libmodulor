import React, {} from 'react';
import { Pressable, Text } from 'react-native';
import { useDIContext } from '../lib/react/DIContextProvider.js';
export function UCFormSubmitControl({ execState, disabled, onPress, uc, }) {
    const { wordingManager } = useDIContext();
    return (React.createElement(Pressable, { onPress: onPress, disabled: disabled },
        React.createElement(Text, null, wordingManager.ucISubmit(uc.def, execState))));
}
