import React, {} from 'react';
export function UCOutputFieldValueFragment({ field, value }) {
    const { def: { type }, } = field;
    type.assign(value);
    return React.createElement(React.Fragment, null, type.fmt());
}
