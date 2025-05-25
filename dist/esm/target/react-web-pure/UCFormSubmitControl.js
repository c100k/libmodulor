import React, {} from 'react';
import { useDIContext } from '../lib/react/DIContextProvider.js';
export function UCFormSubmitControl({ className, execState, disabled, uc, }) {
    const { wordingManager } = useDIContext();
    return (React.createElement("input", { className: className, disabled: disabled, type: "submit", value: wordingManager.ucISubmit(uc.def, execState) }));
}
