import React, {} from 'react';
import { Text } from 'react-native';
import { useDIContext } from '../lib/react/DIContextProvider.js';
export function UCFormFieldLabel({ f, }) {
    const { wordingManager } = useDIContext();
    const { label } = wordingManager.ucif(f);
    return React.createElement(Text, null, label);
}
