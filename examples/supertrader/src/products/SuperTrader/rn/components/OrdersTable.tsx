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
import { Text, View } from 'react-native';

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
        <View>
            <View style={{ gap: 8 }}>
                {items.map((i, idx) => (
                    <View key={i.id} style={{ gap: 4 }}>
                        <Text>{idx + 1}</Text>
                        {fields.map((f) => (
                            <View key={f.key}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {wordingManager.ucof(f.key).label}
                                </Text>
                                <Text>
                                    <UCOutputFieldValue
                                        field={f}
                                        value={i[f.key]}
                                    />
                                </Text>
                            </View>
                        ))}
                        <UCPanel
                            onDone={async (ucor) => update0(ucor)}
                            onError={onError}
                            renderAutoExecLoader={UCAutoExecLoader}
                            renderExecTouchable={UCExecTouchable}
                            renderForm={UCForm}
                            uc={new UC(Manifest, CancelOrderUCD, null).fill({
                                id: i.id,
                            })}
                        />
                    </View>
                ))}
            </View>
            <View>
                <View style={{ flexDirection: 'row', gap: 16 }}>
                    <Text>{i18nManager.t('total')}</Text>
                    <Text>{total}</Text>
                </View>
            </View>
        </View>
    );
}
