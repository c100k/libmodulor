import type { ReactElement } from 'react';

import { Manifest } from '../../../../../../apps/Auth/index.js';
import { AppContextProvider } from '../../AppContext.js';
import { useGlobalContext } from '../../GlobalContext.js';
import SignInUCPanel from './SignInUCPanel.js';
import SignOutUCPanel from './SignOutUCPanel.js';

export default function AuthApp(): ReactElement {
    const { auth } = useGlobalContext();

    return (
        <AppContextProvider manifest={Manifest} menu={[]}>
            {auth && (
                <div>
                    {auth.user.firstname} ({auth.role})
                </div>
            )}

            <SignInUCPanel />
            <SignOutUCPanel />
        </AppContextProvider>
    );
}
