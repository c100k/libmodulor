import type { ReactElement } from 'react';
import { Text } from 'react-native';

import { Manifest } from '../../../../../../../apps/Auth/index.js';
import { AppContextProvider } from '../../AppContext.jsx';
import { useGlobalContext } from '../../GlobalContext.jsx';
import SignInUCPanel from './SignInUCPanel.jsx';
import SignOutUCPanel from './SignOutUCPanel.jsx';

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
