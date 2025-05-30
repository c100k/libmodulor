import React, {} from 'react';
import { Pressable, Text } from 'react-native';
import { useDIContext } from '../lib/react/DIContextProvider.js';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCExecTouchable({ disabled, execState, onSubmit, uc, }) {
    const { wordingManager } = useDIContext();
    const { execTouchable } = useStyleContext();
    const label = wordingManager.ucISubmit(uc.def, execState);
    return (React.createElement(Pressable, { disabled: disabled, onPress: onSubmit },
        React.createElement(Text, { style: execTouchable?.style }, label)));
}
