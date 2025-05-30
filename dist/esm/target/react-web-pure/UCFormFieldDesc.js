import React, {} from 'react';
import { useDIContext } from '../lib/react/DIContextProvider.js';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCFormFieldDesc({ f, }) {
    const { wordingManager } = useDIContext();
    const { formFieldDesc } = useStyleContext();
    const { desc } = wordingManager.ucif(f);
    if (!desc) {
        return null;
    }
    return (React.createElement("div", { className: formFieldDesc?.className, style: formFieldDesc?.style }, desc));
}
