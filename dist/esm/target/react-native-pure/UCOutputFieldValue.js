import React, {} from 'react';
import { Text } from 'react-native';
import { UCOutputFieldValueFragment, } from '../lib/react/UCOutputFieldValueFragment.js';
export function UCOutputFieldValue(props) {
    return (React.createElement(Text, null,
        React.createElement(UCOutputFieldValueFragment, { ...props })));
}
