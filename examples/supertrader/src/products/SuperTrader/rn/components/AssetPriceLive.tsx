import type { UCOutputField } from 'libmodulor';
import type { ReactElement } from 'react';

import type {
    AssetPrice,
    ViewAssetPriceOPI0,
} from '../../../../apps/Trading/index.js';
import UCOutputFieldValue from './UCOutputFieldValue.js';

interface Props {
    evolField: UCOutputField<ViewAssetPriceOPI0, AssetPrice>;
    priceField: UCOutputField<ViewAssetPriceOPI0, AssetPrice>;
    value: ViewAssetPriceOPI0 | undefined;
}

export default function AssetPriceLive({
    evolField,
    priceField,
    value,
}: Props): ReactElement | null {
    if (!value) {
        return null;
    }

    return (
        <div>
            <UCOutputFieldValue f={priceField} value={value.price} />
            {' ('}
            <UCOutputFieldValue f={evolField} value={value.evol} />
            {')'}
        </div>
    );
}
