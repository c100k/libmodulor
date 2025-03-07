import { registerRootComponent } from 'expo';
import { DIContextProvider } from 'libmodulor/react';
import React, { type ReactElement } from 'react';
import { SafeAreaView } from 'react-native';

import App from './components/App.js';
import container from './container.js';

function Index(): ReactElement {
    return (
        <SafeAreaView>
            <DIContextProvider container={container}>
                <App />
            </DIContextProvider>
        </SafeAreaView>
    );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Index);
