import React, { type ReactElement } from 'react';

import type { OrderStatus } from '../../../../apps/Trading/index.js';

interface Props {
    value: OrderStatus;
}

export default function OrderStatusBadge({ value }: Props): ReactElement {
    let variant = '';
    switch (value) {
        // Keep the classname "complete" (i.e. no `badge-${variant}`)
        // Otherwise tailwind won't include it in the bundle
        case 'cancelled':
            variant = 'badge-warning';
            break;
        case 'pending':
            variant = 'badge-info';
            break;
        default:
            ((_: never): void => {})(value);
    }

    return <div className={`badge ${variant}`}>{value}</div>;
}
