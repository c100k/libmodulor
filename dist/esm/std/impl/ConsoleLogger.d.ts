import type { Logger, LoggerMessage, LoggerSettings } from '../Logger.js';
import type { Configurable, SettingsManager } from '../SettingsManager.js';
type S = LoggerSettings;
export declare class ConsoleLogger implements Configurable<S>, Logger {
    private settingsManager;
    private static LEVELS;
    constructor(settingsManager: SettingsManager<S>);
    s(): S;
    debug(message: LoggerMessage, ...meta: unknown[]): void;
    error(err: Error): void;
    info(message: LoggerMessage, ...meta: unknown[]): void;
    trace(message: LoggerMessage, ...meta: unknown[]): void;
    warn(message: LoggerMessage, ...meta: unknown[]): void;
    private shouldLog;
    private t;
}
export {};
