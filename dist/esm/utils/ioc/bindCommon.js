// NOTE : Expose this only at a higher level, otherwise, if exposed in utils/index.js, it will create circular dependencies
import { APP_NAME_PLACEHOLDER, PRODUCT_NAME_PLACEHOLDER, } from '../../convention.js';
import { ConsoleLogger } from '../../std/impl/ConsoleLogger.js';
import { FetchHTTPAPICallExecutor } from '../../std/impl/FetchHTTPAPICallExecutor.js';
import { NoopHTTPAPICallExecutorAgentBuilder } from '../../std/impl/NoopHTTPAPICallExecutorAgentBuilder.js';
import { NoopXMLManager } from '../../std/impl/NoopXMLManager.js';
import { SettingsServerClientManager } from '../../std/impl/SettingsServerClientManager.js';
import { SimpleFormDataBuilder } from '../../std/impl/SimpleFormDataBuilder.js';
import { SimpleHTTPAPICaller } from '../../std/impl/SimpleHTTPAPICaller.js';
import { SimpleMapI18nManager } from '../../std/impl/SimpleMapI18nManager.js';
import { StaticSettingsManager } from '../../std/impl/StaticSettingsManager.js';
import { StdDateClockManager } from '../../std/impl/StdDateClockManager.js';
import { STD_DEFAULT_LOGGER_SETTINGS, } from '../../std/index.js';
import { HTTPUCTransporter } from '../../uc/impl/HTTPUCTransporter.js';
import { InMemoryUCDataStore } from '../../uc/impl/InMemoryUCDataStore.js';
import { SimpleUCManager } from '../../uc/impl/SimpleUCManager.js';
import { StaticUCClientConfirmManager } from '../../uc/impl/StaticUCClientConfirmManager.js';
import { UC_DEFAULT_SETTINGS, } from '../../uc/index.js';
import { bindProvider } from './bindProvider.js';
export function bindCommon(container, settingsFunc) {
    const commonSettings = {
        ...STD_DEFAULT_LOGGER_SETTINGS,
        ...UC_DEFAULT_SETTINGS,
    };
    const settings = {
        ...commonSettings,
        ...settingsFunc?.(commonSettings),
    };
    // product
    if (!container.isBound('ProductManifest')) {
        container.bind('ProductManifest').toConstantValue({
            appReg: [{ name: APP_NAME_PLACEHOLDER }],
            name: PRODUCT_NAME_PLACEHOLDER,
        });
    }
    // std
    container.bind('ClockManager').to(StdDateClockManager);
    container
        .bind('FormDataBuilder')
        .to(SimpleFormDataBuilder);
    container.bind('HTTPAPICaller').to(SimpleHTTPAPICaller);
    container
        .bind('HTTPAPICallExecutor')
        .to(FetchHTTPAPICallExecutor);
    container
        .bind('HTTPAPICallExecutorAgentBuilder')
        .to(NoopHTTPAPICallExecutorAgentBuilder);
    container
        .bind('I18nManager')
        .to(SimpleMapI18nManager)
        .inSingletonScope();
    container.bind('I18n').toConstantValue({ en: {} });
    container.bind('Logger').to(ConsoleLogger);
    container.bind('Settings').toConstantValue(settings);
    container
        .bind('SettingsManager')
        .to(StaticSettingsManager);
    container
        .bind('ServerClientManager')
        .to(SettingsServerClientManager);
    container.bind('XMLManager').to(NoopXMLManager);
    // uc
    bindProvider(container, 'UCInit');
    bindProvider(container, 'UCMain');
    bindProvider(container, 'UCPolicy');
    container
        .bind('UCClientConfirmManager')
        .to(StaticUCClientConfirmManager);
    container
        .bind('UCDataStore')
        .to(InMemoryUCDataStore)
        .inSingletonScope();
    container.bind('UCManager').to(SimpleUCManager).inRequestScope();
    container.bind('UCTransporter').to(HTTPUCTransporter);
}
