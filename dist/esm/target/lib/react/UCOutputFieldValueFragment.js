import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
export function UCOutputFieldValueFragment({ f, value }) {
    const { def: { type }, } = f;
    type.assign(value);
    return _jsx(_Fragment, { children: type.fmt() });
}
