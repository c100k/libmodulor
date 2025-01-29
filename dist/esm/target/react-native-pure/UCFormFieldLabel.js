import React, {} from 'react';
import { Text } from 'react-native';
import { useDIContext } from '../lib/react/DIContextProvider.js';
export function UCFormFieldLabel({ field, }) {
    const { wordingManager } = useDIContext();
    const { label } = wordingManager.ucif(field);
    return React.createElement(Text, null, label);
}
