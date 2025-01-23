import type { Settings } from './SettingsManager.js';
export type LoggerLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error';
export type LoggerMessage = string;
export interface LoggerSettings extends Settings {
    logger_level: LoggerLevel;
}
export interface Logger {
    debug(message: LoggerMessage, ...meta: unknown[]): void;
    error(err: Error): void;
    info(message: LoggerMessage, ...meta: unknown[]): void;
    trace(message: LoggerMessage, ...meta: unknown[]): void;
    warn(message: LoggerMessage, ...meta: unknown[]): void;
}
