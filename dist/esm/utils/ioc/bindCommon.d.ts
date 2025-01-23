import type { Container } from 'inversify';
import { type LoggerSettings, type Settings } from '../../std/index.js';
import { type UCSettings } from '../../uc/index.js';
export type CommonSettings = LoggerSettings & UCSettings;
export type SettingsFunc<S extends Settings> = (commonSettings: CommonSettings) => S & Partial<CommonSettings>;
export declare function bindCommon<S extends Settings = object>(container: Container, settingsFunc?: SettingsFunc<S>): void;
