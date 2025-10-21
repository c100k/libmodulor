import type { SemanticsVariant, Slug } from 'libmodulor';
import type { ReactElement } from 'react';

import type { TAssetPrice } from '../../../../apps/Trading/index.js';

interface Props {
    type: TAssetPrice;
}

// https://daisyui.com/components/badge/#badge-with-dash-style
// Keep the classname "complete" (i.e. no `badge-${variant}`), otherwise tailwind won't include them in the bundle
const SEMANTICS_VARIANT_TEXT_CLASSES_MAPPING: Record<SemanticsVariant, Slug> = {
    danger: 'text-error',
    info: 'text-info',
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning',
};

export default function AssetPriceText({ type }: Props): ReactElement {
    const val = type.val();
    if (!val) {
        return <>{type.fmt()}</>;
    }

    const semantics = type.getSemanticsPredicate()?.(val);

    let className = '';
    if (semantics?.variant) {
        className = SEMANTICS_VARIANT_TEXT_CLASSES_MAPPING[semantics.variant];
    }

    return <span className={className}>{type.fmt()}</span>;
}
