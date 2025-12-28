import type { StringKeys } from '../../utils/index.js';
import type { Settings } from '../SettingsManager.js';
export declare function unsafeDefaultSetting(suffix?: string): string;
export declare function assertSettingNotUnsafe<S extends Settings, K extends StringKeys<S> = StringKeys<S>>(key: K, value: unknown): void;
export declare function checkSettings<S extends Settings>(settings: S, throwIfViolations: boolean): void;
