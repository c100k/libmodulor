import type { ReactElement } from 'react';

import type { DataType, UCOPIBase } from '../../../../../../dist/esm/index.js';
import type { UCOutputFieldValueFragmentProps } from '../../../../../../dist/esm/index.react.js';
import { UCOutputFieldValue as UCOutputFieldValueBase } from '../../../../../../dist/esm/index.react-web-pure.js';
import { TAssetPrice } from '../../../../../apps/Trading/index.js';
import AssetPriceText from './apps/Trading/AssetPriceText.js';

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

    return <UCOutputFieldValueBase f={f} value={value} />;
}
