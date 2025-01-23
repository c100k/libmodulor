export declare const SettingsManagerMandatoryPlaceholder = "!<>!";
export declare const SettingsManagerMandatoryPlaceholderForArray: string[];
export declare const SettingsManagerMandatoryPlaceholderForObject: {
    '0': string;
};
export interface Settings {
}
export interface Configurable<S> {
    s(): S;
}
export type SettingsGetter<S> = <K extends keyof S>(key: K) => S[K];
export interface SettingsManager<S = Settings> {
    get(): SettingsGetter<S>;
}
