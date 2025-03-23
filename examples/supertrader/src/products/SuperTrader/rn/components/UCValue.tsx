import type { DataType, UCOPIBase, UCOutputField } from 'libmodulor';
import React, { type ReactElement } from 'react';
import { Text } from 'react-native';

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

    return <Text>{type.fmt()}</Text>;
}
