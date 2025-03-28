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
    Manifest,
} from '../../../../apps/Trading/index.js';

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

    return (
        <View>
            <View>
                <View style={{ flexDirection: 'row', gap: 16 }}>
                    <Text>#</Text>
                    {fields.map((f) => (
                        <Text key={f.key}>
                            {wordingManager.ucof(f.key).label}
                        </Text>
                    ))}
                    <Text />
                </View>
            </View>
            <View>
                {items.map((i, idx) => (
                    <View key={i.id} style={{ flexDirection: 'row', gap: 16 }}>
                        <Text>{idx + 1}</Text>
                        {fields.map((f) => (
                            <Text key={f.key}>
                                <UCOutputFieldValue
                                    field={f}
                                    value={i[f.key]}
                                />
                            </Text>
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
