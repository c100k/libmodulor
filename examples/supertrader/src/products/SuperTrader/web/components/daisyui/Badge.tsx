import type { DataType, SemanticsVariant, Slug, TBase } from 'libmodulor';
import React, { type ReactElement } from 'react';

interface Props<T extends DataType> {
    type: TBase<T>;
    value: string;
}

// https://daisyui.com/components/badge/#badge-with-dash-style
// Keep the classname "complete" (i.e. no `badge-${variant}`), otherwise tailwind won't include them in the bundle
const SEMANTICS_VARIANT_BADGE_CLASSES_MAPPING: Record<SemanticsVariant, Slug> =
    {
        danger: 'badge-error',
        info: 'badge-info',
        primary: 'badge-primary',
        secondary: 'badge-secondary',
        success: 'badge-success',
        warning: 'badge-warning',
    };

export default function Badge<T extends DataType>({
    type,
    value,
}: Props<T>): ReactElement | null {
    const semantics = type.assign(value).getSemanticsMapping()?.[value];
    if (!semantics?.variant) {
        return null;
    }

    const className =
        SEMANTICS_VARIANT_BADGE_CLASSES_MAPPING[semantics.variant];

    return <div className={`badge ${className}`}>{value}</div>;
}
