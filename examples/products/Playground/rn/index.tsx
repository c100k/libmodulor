import { registerRootComponent } from 'expo';
import type { ReactElement } from 'react';
import { SafeAreaView } from 'react-native';

import {
    DIContextProvider,
    StyleContextProvider,
} from '../../../../dist/esm/index.react.js';
import Root from './components/Root.js';
import container from './container.js';
import { style } from './style.js';

function Index(): ReactElement {
    return (
        <SafeAreaView>
            <DIContextProvider container={container}>
                <StyleContextProvider {...style}>
                    <Root />
                </StyleContextProvider>
            </DIContextProvider>
        </SafeAreaView>
    );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Index);
