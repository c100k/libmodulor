import { UC, UCOutputReader, type UCOutputReaderPart } from 'libmodulor';
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
} from 'libmodulor/react-web-pure';
import { type ReactElement, useState } from 'react';

import {
    CancelOrderUCD,
    type ISIN,
    type ListOrdersOPI0,
    ListOrdersUCD,
    Manifest,
    type ViewAssetPriceOPI0,
    ViewAssetPriceUCD,
} from '../../../../apps/Trading/index.js';
import AssetPriceLive from './AssetPriceLive.js';
import { Hero } from './Hero.js';
import UCOutputFieldValue from './UCOutputFieldValue.js';

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

    const [ucor] = useState(new UCOutputReader(ViewAssetPriceUCD, undefined));
    const [prices, setPrices] = useState<Record<ISIN, ViewAssetPriceOPI0>>({});

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
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    {fields.map((f) => (
                        <th key={f.key}>{wordingManager.ucof(f.key).label}</th>
                    ))}
                    <th className="min-w-96">$$$</th>
                    <th className="min-w-48" />
                </tr>
            </thead>
            <tbody>
                {items.map((i, idx) => (
                    <tr key={i.id}>
                        <td>{idx + 1}</td>
                        {fields.map((f) => (
                            <td key={f.key}>
                                <UCOutputFieldValue f={f} value={i[f.key]} />
                            </td>
                        ))}
                        <td>
                            <div className="flex gap-3">
                                <UCPanel
                                    autoExec={true}
                                    onError={async (_err) => {
                                        // Ignore for now
                                    }}
                                    renderAutoExecLoader={UCAutoExecLoader}
                                    renderExecTouchable={UCExecTouchable}
                                    renderForm={UCForm}
                                    stream={{
                                        onClose: async () => {},
                                        onData: async (ucor) => {
                                            setPrices((prev) => ({
                                                ...prev,
                                                [i.isin]: ucor.item00().item,
                                            }));
                                        },
                                        onDone: async () => {},
                                    }}
                                    uc={new UC(
                                        Manifest,
                                        ViewAssetPriceUCD,
                                        null,
                                    ).fill({ isin: i.isin })}
                                />
                                <AssetPriceLive
                                    evolField={ucor.field0('evol')}
                                    priceField={ucor.field0('price')}
                                    value={prices[i.isin]}
                                />
                            </div>
                        </td>
                        <td>
                            <UCPanel
                                onDone={async (ucor) => update0(ucor)}
                                onError={onError}
                                renderAutoExecLoader={UCAutoExecLoader}
                                renderExecTouchable={UCExecTouchable}
                                renderForm={UCForm}
                                uc={new UC(Manifest, CancelOrderUCD, null).fill(
                                    { id: i.id },
                                )}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <th>{i18nManager.t('total')}</th>
                    {fields.map((f) => (
                        <th key={f.key} />
                    ))}
                    <th />
                    <th>{total}</th>
                </tr>
            </tfoot>
        </table>
    );
}
