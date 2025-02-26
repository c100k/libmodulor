import React, {} from 'react';
import { ucifId } from '../../uc/index.js';
import { useDIContext } from '../lib/react/DIContextProvider.js';
export function UCFormFieldLabel({ f, }) {
    const { wordingManager } = useDIContext();
    const { label } = wordingManager.ucif(f);
    return React.createElement("label", { htmlFor: ucifId(f.key) }, label);
}
