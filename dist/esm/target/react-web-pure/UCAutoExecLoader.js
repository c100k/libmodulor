import React, {} from 'react';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCAutoExecLoader() {
    const { autoExecLoader } = useStyleContext();
    return (React.createElement("div", { className: autoExecLoader?.className, style: autoExecLoader?.style }, "..."));
}
