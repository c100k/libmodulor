import { jsx as _jsx } from "react/jsx-runtime";
import { Pressable, Text } from 'react-native';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCEntrypointTouchable({ onPress, wording, }) {
    const { entrypointTouchable } = useStyleContext();
    return (_jsx(Pressable, { onPress: onPress, children: _jsx(Text, { style: entrypointTouchable?.style, children: wording.label }) }));
}
