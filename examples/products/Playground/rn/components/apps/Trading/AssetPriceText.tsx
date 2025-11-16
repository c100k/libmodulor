import type { ReactElement } from 'react';
import { Text } from 'react-native';

import type {
    Color,
    SemanticsVariant,
} from '../../../../../../../dist/esm/index.js';
import type { TAssetPrice } from '../../../../../../apps/Trading/index.js';
import { style } from '../../../style.js';

interface Props {
    type: TAssetPrice;
}

const SEMANTICS_VARIANT_TEXT_CLASSES_MAPPING: Record<SemanticsVariant, Color> =
    {
        danger: 'red',
        info: 'blue',
        primary: style.colors?.primary ?? 'blue',
        secondary: 'purple',
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
        color = SEMANTICS_VARIANT_TEXT_CLASSES_MAPPING[semantics.variant];
    }

    return <Text style={{ color }}>{type.fmt()}</Text>;
}
