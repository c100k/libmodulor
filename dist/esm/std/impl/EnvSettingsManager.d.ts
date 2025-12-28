import type { EnvironmentManager } from '../EnvironmentManager.js';
import type { Settings, SettingsGetter, SettingsManager } from '../SettingsManager.js';
export declare class EnvSettingsManager<S extends Settings> implements SettingsManager<S> {
    private environmentManager;
    private settings;
    private static ENV_VAR_PREFIX;
    private settingsWithEnv;
    constructor(environmentManager: EnvironmentManager, settings: S);
    get(): SettingsGetter<S>;
    private loadFromEnv;
}
