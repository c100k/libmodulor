import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, } from 'react';
import { WordingManager } from '../../../i18n/index.js';
export const DIContext = createContext(null);
export function useDIContext() {
    const c = useContext(DIContext);
    if (!c) {
        throw new Error('You must initialize DIContext');
    }
    return c;
}
export function DIContextProvider({ children, container, }) {
    const [i18nManager] = useState(container.get('I18nManager'));
    const [wordingManager] = useState(container.get(WordingManager));
    return (_jsx(DIContext.Provider, { value: {
            container,
            i18nManager,
            wordingManager,
        }, children: children }));
}
