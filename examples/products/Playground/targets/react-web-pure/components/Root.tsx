import { type ReactElement, useEffect, useState } from 'react';

import type { Logger } from '../../../../../../dist/esm/index.js';
import { useDIContext } from '../../../../../../dist/esm/index.react.js';
import AuthApp from './apps/Auth/AuthApp.js';
import SpotifyApp from './apps/Spotify/SpotifyApp.js';
import TradingApp from './apps/Trading/TradingApp.js';
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
        <div id="container">
            <div id="content">
                {initializing && <Loader />}

                {!initializing && (
                    <GlobalContextProvider>
                        <Header />
                        <hr />
                        <AuthApp />
                        <hr />
                        <SpotifyApp />
                        <hr />
                        <TradingApp />
                    </GlobalContextProvider>
                )}
            </div>
        </div>
    );
}
