import {
    type Logger,
    type ProductManifest,
    UC,
    UCOutputReader,
} from 'libmodulor';
import {
    UCPanel,
    type UCPanelOnError,
    useDIContext,
    useUC,
    useUCOR,
} from 'libmodulor/react';
import {
    UCAutoExecLoader,
    UCExecTouchable,
    UCForm,
} from 'libmodulor/react-native-pure';
import React, { useEffect, useState, type ReactElement } from 'react';
import { Text, View } from 'react-native';

import {
    BuyAssetUCD,
    CancelOrderUCD,
    ListOrdersUCD,
    Manifest,
} from '../../../../apps/Trading/index.js';
import UCValue from './UCValue.js';

export default function App(): ReactElement {
    const { container, i18nManager, wordingManager } = useDIContext();
    const [logger] = useState(container.get<Logger>('Logger'));
    const [productManifest] = useState(
        container.get<ProductManifest>('ProductManifest'),
    );

    const [buyAssetUC] = useUC(Manifest, BuyAssetUCD, null);
    const [listOrdersUC] = useUC(Manifest, ListOrdersUCD, null);
    const [listOrdersPart0, _listOrdersPart1, { append0, update0 }] = useUCOR(
        new UCOutputReader(ListOrdersUCD, undefined),
    );

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            logger.debug('Initializing i18n');
            await i18nManager.init();
            logger.debug('Done initializing i18n');
            setLoading(false);
        })();
    }, [i18nManager, logger]);

    const onError: UCPanelOnError = async (err) => alert(err.message);

    const { slogan } = wordingManager.p();
    const { label } = wordingManager.uc(buyAssetUC.def);

    return (
        <View style={{ gap: 16, padding: 16 }}>
            {loading && <Text>Loading...</Text>}

            {!loading && (
                <>
                    <Text style={{ fontSize: 24 }}>
                        {productManifest.name} : {slogan}
                    </Text>

                    <Text style={{ fontSize: 16 }}>{label}</Text>

                    <UCPanel
                        clearAfterExec={false}
                        onDone={async (ucor) => append0(ucor)}
                        onError={onError}
                        renderAutoExecLoader={UCAutoExecLoader}
                        renderExecTouchable={UCExecTouchable}
                        renderForm={UCForm}
                        sleepInMs={200} // Fake delay to see submit wording changing
                        uc={buyAssetUC}
                    />

                    <UCPanel
                        autoExec={true}
                        onDone={async (ucor) => append0(ucor)}
                        renderAutoExecLoader={UCAutoExecLoader}
                        renderExecTouchable={UCExecTouchable}
                        renderForm={UCForm}
                        uc={listOrdersUC}
                    />

                    <View>
                        <View>
                            <View style={{ flexDirection: 'row', gap: 16 }}>
                                <Text>#</Text>
                                {listOrdersPart0?.fields.map((f) => (
                                    <Text key={f.key}>
                                        {wordingManager.ucof(f.key).label}
                                    </Text>
                                ))}
                                <Text />
                            </View>
                        </View>
                        <View>
                            {listOrdersPart0?.items.map((i, idx) => (
                                <View
                                    key={i.id}
                                    style={{ flexDirection: 'row', gap: 16 }}
                                >
                                    <Text>{idx + 1}</Text>
                                    {listOrdersPart0.fields.map((f) => (
                                        <Text key={f.key}>
                                            <UCValue
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
                                        uc={new UC(
                                            Manifest,
                                            CancelOrderUCD,
                                            null,
                                        ).fill({ id: i.id })}
                                    />
                                </View>
                            ))}
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', gap: 16 }}>
                                <Text>{i18nManager.t('total')}</Text>
                                <Text>{listOrdersPart0?.pagination.total}</Text>
                            </View>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}
