import type { Settings, SettingsGetter, SettingsManager } from '../SettingsManager.js';
export declare class StaticSettingsManager<S extends Settings> implements SettingsManager<S> {
    private settings;
    constructor(settings: S);
    get(): SettingsGetter<S>;
}
