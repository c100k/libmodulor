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
var EnvSettingsManager_1;
import { inject, injectable } from 'inversify';
import { checkSettings } from '../lib/settings.js';
let EnvSettingsManager = class EnvSettingsManager {
    static { EnvSettingsManager_1 = this; }
    environmentManager;
    settings;
    static ENV_VAR_PREFIX = 'app_';
    settingsWithEnv;
    constructor(environmentManager, settings) {
        this.environmentManager = environmentManager;
        this.settings = settings;
        this.settingsWithEnv = {
            ...this.settings,
        };
        for (const [k, _v] of Object.entries(this.settingsWithEnv)) {
            const fromEnv = this.loadFromEnv(k, this.settings[k]);
            if (fromEnv === undefined) {
                continue;
            }
            // @ts-expect-error
            this.settingsWithEnv[k] = fromEnv;
        }
        checkSettings(this.settingsWithEnv, this.environmentManager.isProd());
    }
    get() {
        return (key) => this.settingsWithEnv[key];
    }
    loadFromEnv(key, defaultValue) {
        const envVarName = `${EnvSettingsManager_1.ENV_VAR_PREFIX}${key}`;
        const envValue = this.environmentManager.env(envVarName);
        if (envValue === undefined) {
            return undefined;
        }
        if (typeof envValue === 'string') {
            if (Array.isArray(defaultValue)) {
                return JSON.parse(envValue);
            }
            if (typeof defaultValue === 'object' && defaultValue !== null) {
                return JSON.parse(envValue);
            }
        }
        if (typeof defaultValue === 'number') {
            if (defaultValue.toString().includes('.')) {
                const envValueAsFloat = Number.parseFloat(envValue);
                if (Number.isNaN(envValueAsFloat)) {
                    throw new Error(`Env var ${envVarName} must be a valid decimal number`);
                }
                return envValueAsFloat;
            }
            const envValueAsInt = Number.parseInt(envValue, 10);
            if (Number.isNaN(envValueAsInt)) {
                throw new Error(`Env var ${envVarName} must be a valid integer`);
            }
            return envValueAsInt;
        }
        if (typeof defaultValue === 'boolean') {
            if (['0', 'false'].includes(envValue)) {
                return false;
            }
            if (['1', 'true'].includes(envValue)) {
                return true;
            }
        }
        return envValue;
    }
};
EnvSettingsManager = EnvSettingsManager_1 = __decorate([
    injectable(),
    __param(0, inject('EnvironmentManager')),
    __param(1, inject('Settings')),
    __metadata("design:paramtypes", [Object, Object])
], EnvSettingsManager);
export { EnvSettingsManager };
