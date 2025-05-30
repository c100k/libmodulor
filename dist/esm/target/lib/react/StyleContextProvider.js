import React, { createContext, useContext, } from 'react';
export const StyleContext = createContext(null);
export function useStyleContext() {
    const c = useContext(StyleContext);
    if (!c) {
        return {};
    }
    return c;
}
export function StyleContextProvider({ children, ...rest }) {
    return (React.createElement(StyleContext.Provider, { value: rest }, children));
}
export function styleDef(def, k1, fallback) {
    const main = def?.[k1];
    const fb = fallback ? def?.[fallback] : null;
    return {
        className: main?.className ?? fb?.className,
        style: main?.style ?? fb?.style,
    };
}
