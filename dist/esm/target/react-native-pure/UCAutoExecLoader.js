import { jsx as _jsx } from "react/jsx-runtime";
import { ActivityIndicator } from 'react-native';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCAutoExecLoader() {
    const { autoExecLoader } = useStyleContext();
    return _jsx(ActivityIndicator, { style: autoExecLoader?.style });
}
