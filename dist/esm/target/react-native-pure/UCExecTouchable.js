import React, {} from 'react';
import { Pressable, Text } from 'react-native';
import { useDIContext } from '../lib/react/DIContextProvider.js';
export function UCExecTouchable({ disabled, execState, onSubmit, uc, }) {
    const { wordingManager } = useDIContext();
    const label = wordingManager.ucISubmit(uc.def, execState);
    return (React.createElement(Pressable, { disabled: disabled, onPress: onSubmit },
        React.createElement(Text, null, label)));
}
