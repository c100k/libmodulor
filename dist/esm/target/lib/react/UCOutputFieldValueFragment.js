import React, {} from 'react';
export function UCOutputFieldValueFragment({ f, value }) {
    const { def: { type }, } = f;
    type.assign(value);
    return React.createElement(React.Fragment, null, type.fmt());
}
