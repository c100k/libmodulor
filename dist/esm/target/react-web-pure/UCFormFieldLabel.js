import React, {} from 'react';
import { ucifId } from '../../uc/index.js';
import { useDIContext } from '../lib/react/DIContextProvider.js';
export function UCFormFieldLabel({ field, }) {
    const { wordingManager } = useDIContext();
    const { label } = wordingManager.ucif(field);
    return React.createElement("label", { htmlFor: ucifId(field.key) }, label);
}
