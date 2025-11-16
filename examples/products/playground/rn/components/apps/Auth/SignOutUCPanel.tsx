import { type ReactElement, useState } from 'react';

import {
    type UCPanelOnDone,
    useDIContext,
    useUC,
} from '../../../../../../../dist/esm/index.react.js';
import { Manifest, SignOutUCD } from '../../../../../../apps/Auth/index.js';
import type { AuthDataStore } from '../../../lib/uc/AuthDataStore.js';
import { useGlobalContext } from '../../GlobalContext.js';
import UCPanel from '../../UCPanel.js';

export default function SignOutUCPanel(): ReactElement {
    const { container } = useDIContext();
    const { auth, setAuth } = useGlobalContext();

    const [authDataStore] = useState(
        container.get<AuthDataStore>('AuthDataStore'),
    );

    const [uc] = useUC(Manifest, SignOutUCD, auth);

    const onDone: UCPanelOnDone = async () => {
        await authDataStore.set(null);
        setAuth(null);
    };

    return <UCPanel onDone={onDone} uc={uc} />;
}
