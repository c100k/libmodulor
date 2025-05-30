import React, {} from 'react';
import { Text } from 'react-native';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
import { UCOutputFieldValueFragment, } from '../lib/react/UCOutputFieldValueFragment.js';
export function UCOutputFieldValue(props) {
    const { outputFieldValue } = useStyleContext();
    return (React.createElement(Text, { style: outputFieldValue?.style },
        React.createElement(UCOutputFieldValueFragment, { ...props })));
}
