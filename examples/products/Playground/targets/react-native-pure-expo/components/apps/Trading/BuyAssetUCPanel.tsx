import type { ReactElement } from 'react';

import {
    type AppendFunc,
    useUC,
} from '../../../../../../../../dist/esm/index.react.js';
import {
    BuyAssetUCD,
    type ListOrdersOPI0,
    Manifest,
} from '../../../../../../../apps/Trading/index.js';
import { useGlobalContext } from '../../GlobalContext.js';
import UCPanel from '../../UCPanel.js';

interface Props {
    append0: AppendFunc<ListOrdersOPI0>;
}

export default function BuyAssetUCPanel({ append0 }: Props): ReactElement {
    const { auth } = useGlobalContext();

    const [uc] = useUC(Manifest, BuyAssetUCD, auth);

    return <UCPanel onDone={async (ucor) => append0(ucor)} uc={uc} />;
}
