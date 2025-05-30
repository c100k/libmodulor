import { UC, type UCOutputReaderPart } from 'libmodulor';
import {
    UCPanel,
    type UCPanelOnError,
    type UpdateFunc,
    useDIContext,
} from 'libmodulor/react';
import {
    UCAutoExecLoader,
    UCExecTouchable,
    UCForm,
    UCOutputFieldValue,
} from 'libmodulor/react-native-pure';
import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
    CancelOrderUCD,
    type ListOrdersOPI0,
    ListOrdersUCD,
    Manifest,
} from '../../../../apps/Trading/index.js';
import { Hero } from './Hero.js';

interface Props {
    listOrdersPart0: UCOutputReaderPart<ListOrdersOPI0>;
    onError: UCPanelOnError;
    update0: UpdateFunc<ListOrdersOPI0>;
}

export default function OrdersTable({
    listOrdersPart0,
    onError,
    update0,
}: Props): ReactElement {
    const { i18nManager, wordingManager } = useDIContext();

    const {
        fields,
        items,
        pagination: { total },
    } = listOrdersPart0;

    const { empty } = wordingManager.ucop(ListOrdersUCD, 0);
    if (total === 0 && empty) {
        return <Hero message={empty} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemsContainer}>
                {items.map((i, idx) => (
                    <View key={i.id} style={styles.item}>
                        <View style={styles.itemContent}>
                            <Text>{idx + 1}</Text>

                            {fields.map((f) => (
                                <View key={f.key}>
                                    <Text style={styles.label}>
                                        {wordingManager.ucof(f.key).label}
                                    </Text>
                                    <Text>
                                        <UCOutputFieldValue
                                            f={f}
                                            value={i[f.key]}
                                        />
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.itemActions}>
                            <UCPanel
                                onDone={async (ucor) => update0(ucor)}
                                onError={onError}
                                renderAutoExecLoader={UCAutoExecLoader}
                                renderExecTouchable={UCExecTouchable}
                                renderForm={UCForm}
                                uc={new UC(Manifest, CancelOrderUCD, null).fill(
                                    {
                                        id: i.id,
                                    },
                                )}
                            />
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.total}>
                <Text style={styles.totalText}>{i18nManager.t('total')}</Text>
                <Text style={styles.totalText}>{total}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    item: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'space-between',
    },
    itemActions: {
        width: '30%',
    },
    itemsContainer: {
        gap: 8,
    },
    itemContent: {
        width: '70%',
    },
    label: {
        fontWeight: 'bold',
    },
    total: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
