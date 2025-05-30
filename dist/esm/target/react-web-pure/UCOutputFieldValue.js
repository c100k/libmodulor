import React, {} from 'react';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
import { UCOutputFieldValueFragment, } from '../lib/react/UCOutputFieldValueFragment.js';
export function UCOutputFieldValue(props) {
    const { outputFieldValue } = useStyleContext();
    return (React.createElement("span", { className: outputFieldValue?.className, style: outputFieldValue?.style },
        React.createElement(UCOutputFieldValueFragment, { ...props })));
}
