import type { ReactElement } from 'react';

import { UCOutputReader } from '../../../../../../../../dist/esm/index.js';
import {
    useUC,
    useUCOR,
} from '../../../../../../../../dist/esm/index.react.js';
import {
    AskQuestionUCD,
    BuyAssetUCD,
    ListOrdersUCD,
    Manifest,
} from '../../../../../../../apps/Trading/index.js';
import { AppContextProvider } from '../../AppContext.jsx';
import AppSection from '../../AppSection.jsx';
import { useGlobalContext } from '../../GlobalContext.jsx';
import AskQuestionUCPanel from './AskQuestionUCPanel.jsx';
import BuyAssetUCPanel from './BuyAssetUCPanel.jsx';
import ListOrdersUCPanel from './ListOrdersUCPanel.jsx';

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

            <AppSection uc={buyAssetUC}>
                <ListOrdersUCPanel
                    append0={append0}
                    part0={part0}
                    update0={update0}
                />
            </AppSection>
        </AppContextProvider>
    );
}
