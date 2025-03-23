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
import { UCAutoExecLoader } from 'libmodulor/react-web-pure';
import React, { useEffect, useState, type ReactElement } from 'react';

import {
    BuyAssetUCD,
    CancelOrderUCD,
    ListOrdersUCD,
    Manifest,
} from '../../../../apps/Trading/index.js';
import OrderStatusBadge from './OrderStatusBadge.js';
import { UCExecTouchable } from './UCExecTouchable.js';
import { UCForm } from './UCForm.js';

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

        const { slogan } = wordingManager.p();
        document.title = `${productManifest.name} : ${slogan}`;
    }, [i18nManager, logger, productManifest, wordingManager]);

    const onError: UCPanelOnError = async (err) => alert(err.message);

    const { slogan } = wordingManager.p();
    const { label } = wordingManager.uc(buyAssetUC.def);

    return (
        <div className="flex flex-col gap-3 p-8 w-2/3">
            {loading && 'Loading...'}

            {!loading && (
                <>
                    <h1 className="text-2xl">
                        {productManifest.name} : {slogan}
                    </h1>

                    <h2 className="text-xl">{label}</h2>

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

                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                {listOrdersPart0?.fields.map((f) => (
                                    <th key={f.key}>
                                        {wordingManager.ucof(f.key).label}
                                    </th>
                                ))}
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {listOrdersPart0?.items.map((i, idx) => (
                                <tr key={i.id}>
                                    <td>{idx + 1}</td>
                                    {listOrdersPart0.fields.map((f) => (
                                        <td key={f.key}>
                                            {f.key === 'status' ? (
                                                <OrderStatusBadge
                                                    value={i.status}
                                                />
                                            ) : (
                                                <span>{i[f.key]}</span>
                                            )}
                                        </td>
                                    ))}
                                    <td>
                                        <UCPanel
                                            onDone={async (ucor) =>
                                                update0(ucor)
                                            }
                                            onError={onError}
                                            renderAutoExecLoader={
                                                UCAutoExecLoader
                                            }
                                            renderExecTouchable={
                                                UCExecTouchable
                                            }
                                            renderForm={UCForm}
                                            uc={new UC(
                                                Manifest,
                                                CancelOrderUCD,
                                                null,
                                            ).fill({ id: i.id })}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th />
                                <th>{i18nManager.t('total')}</th>
                                <th />
                                <th />
                                <th />
                                <th>{listOrdersPart0?.pagination.total}</th>
                            </tr>
                        </tfoot>
                    </table>
                </>
            )}
        </div>
    );
}
