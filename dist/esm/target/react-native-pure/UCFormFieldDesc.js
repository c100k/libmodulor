import React, {} from 'react';
import { Text } from 'react-native';
import { useDIContext } from '../lib/react/DIContextProvider.js';
export function UCFormFieldDesc({ field, }) {
    const { wordingManager } = useDIContext();
    const { desc } = wordingManager.ucif(field);
    if (!desc) {
        return null;
    }
    return React.createElement(Text, null, desc);
}
