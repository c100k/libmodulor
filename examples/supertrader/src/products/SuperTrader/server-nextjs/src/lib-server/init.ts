import {
    ExternalResourceInstaller,
    type I18nManager,
    type Logger,
    UCDataStoreExternalResourceManager,
} from 'libmodulor';

import container from '../container-server.js';

export async function init(): Promise<void> {
    const externalResourceInstaller = container.get(ExternalResourceInstaller);
    const i18nManager = container.get<I18nManager>('I18nManager');
    const logger = container.get<Logger>('Logger');
    const ucDataStoreERM = container.get(UCDataStoreExternalResourceManager);

    logger.info('Initializing i18n manager');
    await i18nManager.init();

    logger.info('Installing');
    await externalResourceInstaller.exec({
        autoGenerate: true,
        force: false,
        manager: ucDataStoreERM,
        onFeedback: async (feedback) => logger.info(feedback.message),
    });

    logger.info('Starting');
}
