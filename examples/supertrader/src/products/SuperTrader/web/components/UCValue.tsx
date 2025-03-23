import type { DataType, UCOPIBase, UCOutputField } from 'libmodulor';
import React, { type ReactElement } from 'react';

import { TISIN, TOrderStatus } from '../../../../apps/Trading/index.js';
import Badge from './Badge.js';

interface Props<OPI extends UCOPIBase, T extends DataType> {
    field: UCOutputField<OPI, T>;
    value: T;
}

export default function UCValue<OPI extends UCOPIBase, T extends DataType>({
    field,
    value,
}: Props<OPI, T>): ReactElement {
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

    return <span>{type.fmt()}</span>;
}
