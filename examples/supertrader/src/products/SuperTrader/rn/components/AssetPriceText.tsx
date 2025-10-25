import type { Color, SemanticsVariant } from 'libmodulor';
import type { ReactElement } from 'react';
import { Text } from 'react-native';

import type { TAssetPrice } from '../../../../apps/Trading/index.js';

interface Props {
    type: TAssetPrice;
}

const SEMANTICS_VARIANT_COLORS_MAPPING: Record<SemanticsVariant, Color> = {
    danger: 'red',
    info: 'cyan',
    primary: 'blue',
    secondary: 'green',
    success: 'green',
    warning: 'orange',
};

export default function AssetPriceText({ type }: Props): ReactElement {
    const val = type.val();
    if (!val) {
        return <>{type.fmt()}</>;
    }

    const semantics = type.getSemanticsPredicate()?.(val);

    let color = '';
    if (semantics?.variant) {
        color = SEMANTICS_VARIANT_COLORS_MAPPING[semantics.variant];
    }

    return <Text style={{ color }}>{type.fmt()}</Text>;
}
