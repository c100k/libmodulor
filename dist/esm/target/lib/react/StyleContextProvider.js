import React, { createContext, useContext, } from 'react';
export const StyleContext = createContext({});
export function useStyleContext() {
    return useContext(StyleContext);
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
