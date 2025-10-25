import type { DataType, UCOPIBase } from 'libmodulor';
import type { UCOutputFieldValueFragmentProps } from 'libmodulor/react';
import { UCOutputFieldValue as UCOutputFieldValueBase } from 'libmodulor/react-web-pure';
import type { ReactElement } from 'react';

import {
    TAssetPrice,
    TISIN,
    TOrderStatus,
} from '../../../../apps/Trading/index.js';
import AssetPriceText from './AssetPriceText.js';
import Badge from './Badge.js';

export default function UCOutputFieldValue<
    OPI extends UCOPIBase,
    T extends DataType,
>({ f, value }: UCOutputFieldValueFragmentProps<OPI, T>): ReactElement {
    const {
        def: { type },
    } = f;
    type.assign(value);

    if (type instanceof TAssetPrice) {
        return <AssetPriceText type={type} />;
    }

    if (type instanceof TISIN) {
        return <Badge type={type} />;
    }

    if (type instanceof TOrderStatus) {
        return <Badge type={type} />;
    }

    return <UCOutputFieldValueBase f={f} value={value} />;
}
