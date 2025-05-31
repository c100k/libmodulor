import type { UCOutputReaderPart } from 'libmodulor';
import {
    type UCPanelOnError,
    type UpdateFunc,
    useDIContext,
} from 'libmodulor/react';
import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import {
    type ListOrdersOPI0,
    ListOrdersUCD,
} from '../../../../apps/Trading/index.js';
import { Hero } from './Hero.js';
import OrderCard from './OrderCard.js';
import OrderTotals from './OrderTotals.js';

interface Props {
    listOrdersPart0: UCOutputReaderPart<ListOrdersOPI0>;
    onError: UCPanelOnError;
    update0: UpdateFunc<ListOrdersOPI0>;
}

export default function OrdersList({
    listOrdersPart0,
    onError,
    update0,
}: Props): ReactElement {
    const { wordingManager } = useDIContext();

    const { fields, items, pagination } = listOrdersPart0;
    const { total } = pagination;

    const { empty } = wordingManager.ucop(ListOrdersUCD, 0);
    if (total === 0 && empty) {
        return <Hero message={empty} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {items.map((item, idx) => (
                    <OrderCard
                        fields={fields}
                        item={item}
                        key={item.id}
                        num={idx + 1}
                        onError={onError}
                        update0={update0}
                    />
                ))}
            </View>

            <OrderTotals pagination={pagination} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    content: {
        gap: 8,
    },
});
