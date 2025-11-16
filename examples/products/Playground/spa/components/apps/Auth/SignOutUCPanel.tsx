import type { ReactElement } from 'react';

import {
    type UCPanelOnDone,
    useUC,
} from '../../../../../../../dist/esm/index.react.js';
import { Manifest, SignOutUCD } from '../../../../../../apps/Auth/index.js';
import { useGlobalContext } from '../../GlobalContext.js';
import UCPanel from '../../UCPanel.js';

export default function SignOutUCPanel(): ReactElement {
    const { auth, setAuth } = useGlobalContext();

    const [uc] = useUC(Manifest, SignOutUCD, auth);

    const onDone: UCPanelOnDone = async () => {
        setAuth(null);
    };

    return <UCPanel onDone={onDone} uc={uc} />;
}
