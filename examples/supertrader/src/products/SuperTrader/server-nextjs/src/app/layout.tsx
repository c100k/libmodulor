import {
    ExternalResourceInstaller,
    type I18nManager,
    type Logger,
    UCDataStoreExternalResourceManager,
} from 'libmodulor';
import React, { type PropsWithChildren, type ReactElement } from 'react';

import ClientLayout from '../components/ClientLayout.js';
import container from '../container-server.js';

import './styles.css';

const i18nManager = container.get<I18nManager>('I18nManager');
const logger = container.get<Logger>('Logger');

logger.info('Initializing server');
logger.info('Initializing i18n');
await i18nManager.init();
logger.info('Done initializing i18n');
await container.get(ExternalResourceInstaller).exec({
    autoGenerate: true,
    force: false,
    manager: container.get(UCDataStoreExternalResourceManager),
    onFeedback: async (feedback) => logger.info(feedback.message),
});
logger.info('Done initializing server');

export default function RootLayout({
    children,
}: PropsWithChildren): ReactElement {
    return (
        <html lang={i18nManager.l()}>
            <body>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
