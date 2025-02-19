/**
 * Placeholder for string settings that must be defined explicitly at runtime (e.g. secrets).
 */
export declare const SettingsManagerMandatoryPlaceholder = "!<>!";
/**
 * Placeholder for array settings that must be defined explicitly at runtime (e.g. secrets).
 */
export declare const SettingsManagerMandatoryPlaceholderForArray: string[];
/**
 * Placeholder for object settings that must be defined explicitly at runtime (e.g. secrets).
 */
export declare const SettingsManagerMandatoryPlaceholderForObject: {
    '0': string;
};
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
export type SettingsGetter<S> = <K extends keyof S>(key: K) => S[K];
export interface SettingsManager<S = Settings> {
    get(): SettingsGetter<S>;
}
