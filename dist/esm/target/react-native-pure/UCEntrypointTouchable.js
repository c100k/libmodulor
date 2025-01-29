import React, {} from 'react';
import { Pressable, Text } from 'react-native';
export function UCEntrypointTouchable({ onPress, wording, }) {
    return (React.createElement(Pressable, { onPress: onPress },
        React.createElement(Text, null, wording.label)));
}
