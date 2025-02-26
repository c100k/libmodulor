import React, {} from 'react';
import { useDIContext } from '../lib/react/DIContextProvider.js';
export function UCFormSubmitControl({ execState, disabled, uc, }) {
    const { wordingManager } = useDIContext();
    return (React.createElement("input", { disabled: disabled, type: "submit", value: wordingManager.ucISubmit(uc.def, execState) }));
}
