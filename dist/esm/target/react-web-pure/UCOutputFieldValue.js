import React, {} from 'react';
import { UCOutputFieldValueFragment, } from '../lib/react/UCOutputFieldValueFragment.js';
export function UCOutputFieldValue({ className, ...propsWithoutClassName }) {
    return (React.createElement("span", { className: className },
        React.createElement(UCOutputFieldValueFragment, { ...propsWithoutClassName })));
}
