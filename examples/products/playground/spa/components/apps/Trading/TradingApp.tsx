import type { ReactElement } from 'react';

import { UCOutputReader } from '../../../../../../../dist/esm/index.js';
import { useUC, useUCOR } from '../../../../../../../dist/esm/index.react.js';
import {
    AskQuestionUCD,
    BuyAssetUCD,
    ListOrdersUCD,
    Manifest,
} from '../../../../../../apps/Trading/index.js';
import { AppContextProvider } from '../../AppContext.js';
import AppSection from '../../AppSection.js';
import { useGlobalContext } from '../../GlobalContext.js';
import AskQuestionUCPanel from './AskQuestionUCPanel.js';
import BuyAssetUCPanel from './BuyAssetUCPanel.js';
import ListOrdersUCPanel from './ListOrdersUCPanel.js';

export default function TradingApp(): ReactElement {
    const { auth } = useGlobalContext();

    const [askQuestionUC] = useUC(Manifest, AskQuestionUCD, auth);
    const [buyAssetUC] = useUC(Manifest, BuyAssetUCD, auth);
    const [listOrdersUC] = useUC(Manifest, ListOrdersUCD, auth);

    const [part0, _part1, { append0, update0 }] = useUCOR(
        new UCOutputReader(ListOrdersUCD, undefined),
    );

    return (
        <AppContextProvider
            manifest={Manifest}
            menu={[askQuestionUC, buyAssetUC, listOrdersUC]}
        >
            <AppSection uc={askQuestionUC}>
                <AskQuestionUCPanel />
            </AppSection>

            <AppSection uc={buyAssetUC}>
                <BuyAssetUCPanel append0={append0} />
            </AppSection>

            <AppSection uc={listOrdersUC}>
                <ListOrdersUCPanel
                    append0={append0}
                    part0={part0}
                    update0={update0}
                />
            </AppSection>
        </AppContextProvider>
    );
}
