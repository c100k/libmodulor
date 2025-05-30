import React, {} from 'react';
import { ActivityIndicator } from 'react-native';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCAutoExecLoader() {
    const { autoExecLoader } = useStyleContext();
    return React.createElement(ActivityIndicator, { style: autoExecLoader?.style });
}
