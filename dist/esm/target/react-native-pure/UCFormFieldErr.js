import React, {} from 'react';
import { Text } from 'react-native';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCFormFieldErr({ errMsg }) {
    const { formFieldErr } = useStyleContext();
    return React.createElement(Text, { style: formFieldErr?.style }, errMsg);
}
