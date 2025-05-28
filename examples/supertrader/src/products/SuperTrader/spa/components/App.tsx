import { type Logger, type ProductManifest, UCOutputReader } from 'libmodulor';
import {
    UCPanel,
    type UCPanelOnError,
    useDIContext,
    useUC,
    useUCOR,
} from 'libmodulor/react';
import React, { useEffect, useState, type ReactElement } from 'react';

import {
    BuyAssetUCD,
    ListOrdersUCD,
    Manifest,
} from '../../../../apps/Trading/index.js';
import OrdersTable from './OrdersTable.js';
import { UCAutoExecLoader } from './UCAutoExecLoader.js';
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
    const { label: buyAssetLabel } = wordingManager.uc(buyAssetUC.def);
    const { label: listOrdersLabel } = wordingManager.uc(listOrdersUC.def);

    return (
        <div className="flex flex-col gap-3 p-8 w-2/3">
            {loading && <span className="loading loading-ring loading-xl" />}

            {!loading && (
                <>
                    <h1 className="text-2xl">
                        {productManifest.name} : {slogan}
                    </h1>

                    <h2 className="text-xl">{buyAssetLabel}</h2>

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

                    <h2 className="text-xl">{listOrdersLabel}</h2>

                    <UCPanel
                        autoExec={true}
                        onDone={async (ucor) => append0(ucor)}
                        renderAutoExecLoader={UCAutoExecLoader}
                        renderExecTouchable={UCExecTouchable}
                        renderForm={UCForm}
                        uc={listOrdersUC}
                    />

                    <OrdersTable
                        listOrdersPart0={listOrdersPart0}
                        onError={onError}
                        update0={update0}
                    />
                </>
            )}
        </div>
    );
}
