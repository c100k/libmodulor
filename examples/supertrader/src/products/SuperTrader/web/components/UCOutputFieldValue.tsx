import type { DataType, UCOPIBase } from 'libmodulor';
import type { UCOutputFieldValueFragmentProps } from 'libmodulor/react';
import { UCOutputFieldValue as UCOutputFieldValueBase } from 'libmodulor/react-web-pure';
import React, { type ReactElement } from 'react';

import { TISIN, TOrderStatus } from '../../../../apps/Trading/index.js';
import Badge from './Badge.js';

export default function UCOutputFieldValue<
    OPI extends UCOPIBase,
    T extends DataType,
>({ field, value }: UCOutputFieldValueFragmentProps<OPI, T>): ReactElement {
    const {
        def: { type },
    } = field;
    type.assign(value);

    if (type instanceof TISIN && typeof value === 'string') {
        return <Badge type={type} value={type.fmt()} />;
    }

    if (type instanceof TOrderStatus && typeof value === 'string') {
        return <Badge type={type} value={type.fmt()} />;
    }

    return <UCOutputFieldValueBase field={field} value={value} />;
}
