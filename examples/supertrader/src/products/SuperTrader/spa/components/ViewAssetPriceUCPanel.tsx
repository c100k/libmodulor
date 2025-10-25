import type { UCOutputReader } from 'libmodulor';
import { UCPanel, useUC } from 'libmodulor/react';
import {
    UCAutoExecLoader,
    UCExecTouchable,
    UCForm,
} from 'libmodulor/react-web-pure';
import type { Dispatch, ReactElement, SetStateAction } from 'react';

import {
    type ISIN,
    type ListOrdersOPI0,
    Manifest,
    type ViewAssetPriceInput,
    type ViewAssetPriceOPI0,
    ViewAssetPriceUCD,
} from '../../../../apps/Trading/index.js';
import AssetPriceLive, { type AssetPriceLiveValue } from './AssetPriceLive.js';

export type Prices = Record<ISIN, AssetPriceLiveValue>;

interface Props {
    item: ListOrdersOPI0;
    prices: Prices;
    setPrices: Dispatch<SetStateAction<Prices>>;
    ucor: UCOutputReader<ViewAssetPriceInput, ViewAssetPriceOPI0>;
}

export default function ViewAssetPriceUCPanel({
    item,
    prices,
    setPrices,
    ucor,
}: Props): ReactElement {
    const { isin } = item;

    const [uc] = useUC(Manifest, ViewAssetPriceUCD, null, {
        fillWith: { isin },
    });

    return (
        <div className="flex items-center gap-3">
            <UCPanel
                autoExec={true}
                onError={async (err) => {
                    setPrices((prev) => ({
                        ...prev,
                        [isin]: {
                            error: (err as Error).message,
                            opi: null,
                        },
                    }));
                }}
                renderAutoExecLoader={UCAutoExecLoader}
                renderExecTouchable={UCExecTouchable}
                renderForm={UCForm}
                stream={{
                    onClose: async () => {},
                    onData: async (ucor) => {
                        setPrices((prev) => ({
                            ...prev,
                            [isin]: {
                                error: null,
                                opi: ucor.item00().item,
                            },
                        }));
                    },
                    onDone: async () => {},
                }}
                uc={uc}
            />
            <AssetPriceLive
                evolField={ucor.field0('evol')}
                priceField={ucor.field0('price')}
                value={prices[isin]}
            />
        </div>
    );
}
