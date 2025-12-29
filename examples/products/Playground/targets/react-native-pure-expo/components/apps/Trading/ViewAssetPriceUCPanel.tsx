import type { Dispatch, ReactElement, SetStateAction } from 'react';
import { Text, View } from 'react-native';

import type { UCOutputReader } from '../../../../../../../../dist/esm/index.js';
import {
    useDIContext,
    useUC,
} from '../../../../../../../../dist/esm/index.react.js';
import {
    type ISIN,
    type ListOrdersOPI0,
    Manifest,
    type ViewAssetPriceInput,
    type ViewAssetPriceOPI0,
    ViewAssetPriceUCD,
} from '../../../../../../../apps/Trading/index.js';
import UCPanel from '../../UCPanel.jsx';
import AssetPriceLive, { type AssetPriceLiveValue } from './AssetPriceLive.jsx';

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
    const { i18nManager } = useDIContext();

    const { isin } = item;

    const [uc] = useUC(Manifest, ViewAssetPriceUCD, null, {
        fillWith: { isin },
    });

    return (
        <View style={{ alignItems: 'center', flexDirection: 'row', gap: 8 }}>
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
            <Text style={{ color: 'gray' }}>
                {i18nManager.t('sse_unavailable')}
            </Text>
        </View>
    );
}
