import React, { createContext, useContext, useState, } from 'react';
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
    return (React.createElement(DIContext.Provider, { value: {
            container,
            i18nManager,
            wordingManager,
        } }, children));
}
