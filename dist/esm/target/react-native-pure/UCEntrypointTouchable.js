import React, {} from 'react';
import { Pressable, Text } from 'react-native';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCEntrypointTouchable({ onPress, wording, }) {
    const { entrypointTouchable } = useStyleContext();
    return (React.createElement(Pressable, { onPress: onPress },
        React.createElement(Text, { style: entrypointTouchable?.style }, wording.label)));
}
