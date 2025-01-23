import type { EnvironmentManager } from '../EnvironmentManager.js';
import { type Settings, type SettingsGetter, type SettingsManager } from '../SettingsManager.js';
export declare class EnvSettingsManager<S extends Settings = Settings> implements SettingsManager<S> {
    private environmentManager;
    private settings;
    static ENV_VAR_PREFIX: string;
    constructor(environmentManager: EnvironmentManager, settings: S);
    get(): SettingsGetter<S>;
    isMandatoryPlaceholder(value: unknown): value is string;
}
