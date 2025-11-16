import type { ReactElement } from 'react';
import { Text } from 'react-native';

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
                <Text>
                    {auth.user.firstname} ({auth.role})
                </Text>
            )}

            <SignInUCPanel />
            <SignOutUCPanel />
        </AppContextProvider>
    );
}
