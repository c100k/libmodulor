import React, {} from 'react';
import { Text } from 'react-native';
import { useDIContext } from '../lib/react/DIContextProvider.js';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCFormFieldDesc({ f, }) {
    const { wordingManager } = useDIContext();
    const { formFieldDesc } = useStyleContext();
    const { desc } = wordingManager.ucif(f);
    if (!desc) {
        return null;
    }
    return React.createElement(Text, { style: formFieldDesc?.style }, desc);
}
