import { type ReactElement, useEffect, useState } from 'react';
// import TradingApp from './trading/TradingApp.js';
import { ScrollView, View } from 'react-native';

import type { Logger } from '../../../../../dist/esm/index.js';
import { useDIContext } from '../../../../../dist/esm/index.react.js';
import AuthApp from './apps/Auth/AuthApp.js';
import SpotifyApp from './apps/Spotify/SpotifyApp.js';
import TradingApp from './apps/Trading/TradingApp.js';
import Hr from './base/Hr.js';
import { GlobalContextProvider } from './GlobalContext.js';
import Header from './Header.js';
import Loader from './Loader.js';

export default function Root(): ReactElement {
    const { container, i18nManager } = useDIContext();

    const [logger] = useState(container.get<Logger>('Logger'));

    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        (async () => {
            logger.debug('Initializing i18n');
            await i18nManager.init();
            await i18nManager.changeLang('en');
            logger.debug('Done initializing i18n');
            setInitializing(false);
        })();
    }, [i18nManager, logger]);

    return (
        <ScrollView
            contentContainerStyle={{
                gap: 8,
                padding: 8,
            }}
        >
            <View>
                {initializing && <Loader />}

                {!initializing && (
                    <GlobalContextProvider>
                        <Header />
                        <Hr />
                        <AuthApp />
                        <Hr />
                        <SpotifyApp />
                        <Hr />
                        <TradingApp />
                    </GlobalContextProvider>
                )}
            </View>
        </ScrollView>
    );
}
