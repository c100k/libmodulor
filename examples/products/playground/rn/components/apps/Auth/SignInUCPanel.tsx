import { type ReactElement, useState } from 'react';

import type {
    JWTManager,
    JWTManagerPayload,
    UCAuth,
} from '../../../../../../../dist/esm/index.js';
import {
    type UCPanelOnDone,
    useDIContext,
    useUC,
} from '../../../../../../../dist/esm/index.react.js';
import {
    Manifest,
    type SignInInput,
    type SignInOPI0,
    SignInUCD,
} from '../../../../../../apps/Auth/index.js';
import type { AuthDataStore } from '../../../lib/uc/AuthDataStore.js';
import { useGlobalContext } from '../../GlobalContext.js';
import UCPanel from '../../UCPanel.js';

export default function SignInUCPanel(): ReactElement {
    const { container } = useDIContext();
    const { auth, setAuth } = useGlobalContext();

    const [authDataStore] = useState(
        container.get<AuthDataStore>('AuthDataStore'),
    );
    const [jwtManager] = useState(container.get<JWTManager>('JWTManager'));

    const [uc] = useUC(Manifest, SignInUCD, auth);

    const onDone: UCPanelOnDone<SignInInput, SignInOPI0> = async (ucor) => {
        const { jwt } = ucor.item00().item;
        const decoded = await jwtManager.decodeUnsafe<
            JWTManagerPayload & UCAuth
        >(jwt);
        await authDataStore.set(jwt);
        setAuth(decoded);
    };

    return <UCPanel onDone={onDone} uc={uc} />;
}
