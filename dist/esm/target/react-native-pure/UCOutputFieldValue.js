import { jsx as _jsx } from "react/jsx-runtime";
import { Text } from 'react-native';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
import { UCOutputFieldValueFragment, } from '../lib/react/UCOutputFieldValueFragment.js';
export function UCOutputFieldValue(props) {
    const { outputFieldValue } = useStyleContext();
    return (_jsx(Text, { style: outputFieldValue?.style, children: _jsx(UCOutputFieldValueFragment, { ...props }) }));
}
