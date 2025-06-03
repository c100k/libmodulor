import { registerRootComponent } from 'expo';
import { DIContextProvider, StyleContextProvider } from 'libmodulor/react';
import type { ReactElement } from 'react';
import { SafeAreaView } from 'react-native';

import App from './components/App.js';
import container from './container.js';
import { style } from './style.js';

function Index(): ReactElement {
    return (
        <SafeAreaView>
            <DIContextProvider container={container}>
                <StyleContextProvider {...style}>
                    <App />
                </StyleContextProvider>
            </DIContextProvider>
        </SafeAreaView>
    );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Index);
