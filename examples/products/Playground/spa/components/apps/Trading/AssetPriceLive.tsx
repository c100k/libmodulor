import type { ReactElement } from 'react';

import type {
    ErrorMessage,
    UCOutputField,
} from '../../../../../../../dist/esm/index.js';
import type {
    AssetPrice,
    ViewAssetPriceOPI0,
} from '../../../../../../apps/Trading/index.js';
import ErrMessage from '../../ErrMessage.js';
import UCOutputFieldValue from '../../UCOutputFieldValue.js';

export interface AssetPriceLiveValue {
    errMsg: ErrorMessage | null;
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

    const { errMsg, opi } = value;
    if (errMsg) {
        return <ErrMessage errMsg={errMsg} />;
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
