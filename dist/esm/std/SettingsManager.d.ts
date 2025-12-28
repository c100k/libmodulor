import type { StringKeys } from '../utils/index.js';
/**
 * A group of settings
 *
 * Prefix them with the thing that is configurable to avoid conflicts when defining settings together for a product and/or a target.
 */
export interface Settings {
}
/**
 * Interface to implement by the classes that needs settings
 *
 * As `S`, pass the subset of settings that the class needs (e.g. `Pick<SomeSettings, 'setting_1'>`).
 */
export interface Configurable<S> {
    s(): S;
}
export type SettingsGetter<S extends Settings> = <K extends StringKeys<S>>(key: K) => S[K];
export interface SettingsManager<S extends Settings = Settings> {
    get(): SettingsGetter<S>;
}
