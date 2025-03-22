import React, { useRef, type ReactElement } from 'react';

import {
    type OrderStatus,
    TOrderStatus,
} from '../../../../apps/Trading/index.js';
import Badge from './daisyui/Badge.js';

interface Props {
    value: OrderStatus;
}

export default function OrderStatusBadge({
    value,
}: Props): ReactElement | null {
    const type = useRef(new TOrderStatus());

    return <Badge type={type.current} value={value} />;
}
