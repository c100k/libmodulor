import type { ErrorMessage, UCOutputField } from 'libmodulor';
import type { ReactElement } from 'react';

import type {
    AssetPrice,
    ViewAssetPriceOPI0,
} from '../../../../apps/Trading/index.js';
import UCOutputFieldValue from './UCOutputFieldValue.js';

export interface AssetPriceLiveValue {
    error: ErrorMessage | null;
    opi: ViewAssetPriceOPI0 | null;
}

interface Props {
    evolField: UCOutputField<ViewAssetPriceOPI0, AssetPrice>;
    priceField: UCOutputField<ViewAssetPriceOPI0, AssetPrice>;
    value: AssetPriceLiveValue | undefined;
}

export default function AssetPriceLive({
    evolField,
    priceField,
    value,
}: Props): ReactElement | null {
    if (!value) {
        return null;
    }

    const { error, opi } = value;
    if (error) {
        return <span className="text-error">{error}</span>;
    }

    if (!opi) {
        // Should never happen
        return null;
    }

    const { evol, price } = opi;

    return (
        <div>
            <UCOutputFieldValue f={priceField} value={price} />
            {' ('}
            <UCOutputFieldValue f={evolField} value={evol} />
            {')'}
        </div>
    );
}
