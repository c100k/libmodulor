var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ConsoleLogger_1;
import { inject, injectable } from 'inversify';
let ConsoleLogger = class ConsoleLogger {
    static { ConsoleLogger_1 = this; }
    settingsManager;
    static LEVELS = [
        'trace',
        'debug',
        'info',
        'warn',
        'error',
    ];
    constructor(settingsManager) {
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            logger_level: this.settingsManager.get()('logger_level'),
        };
    }
    debug(message, ...meta) {
        if (!this.shouldLog('debug')) {
            return;
        }
        console.debug(`${this.t()} [debug] ${message}`, ...meta);
    }
    error(err) {
        if (!this.shouldLog('error')) {
            return;
        }
        console.error(err);
    }
    info(message, ...meta) {
        if (!this.shouldLog('info')) {
            return;
        }
        console.info(`${this.t()} [info] ${message}`, ...meta);
    }
    trace(message, ...meta) {
        if (!this.shouldLog('trace')) {
            return;
        }
        console.debug(`${this.t()} [trace] ${message}`, ...meta);
    }
    warn(message, ...meta) {
        if (!this.shouldLog('warn')) {
            return;
        }
        console.warn(`${this.t()} [warn] ${message}`, ...meta);
    }
    shouldLog(level) {
        const configLevelIndex = ConsoleLogger_1.LEVELS.findIndex((l) => l === this.s().logger_level);
        const levelIndex = ConsoleLogger_1.LEVELS.findIndex((l) => l === level);
        return levelIndex >= configLevelIndex;
    }
    t() {
        return new Date().toISOString();
    }
};
ConsoleLogger = ConsoleLogger_1 = __decorate([
    injectable(),
    __param(0, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object])
], ConsoleLogger);
export { ConsoleLogger };
