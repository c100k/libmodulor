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
var SimpleMapI18nManager_1;
import { inject, injectable } from 'inversify';
import { I18N_DEFAULT_LANG, } from '../../i18n/index.js';
let SimpleMapI18nManager = class SimpleMapI18nManager {
    static { SimpleMapI18nManager_1 = this; }
    i18n;
    logger;
    static PLACEHOLDERS_REGEX = /{{([A-Z-a-z0-9]+)}}/g; // Note the 'g' so it can be used with `matchAll`
    entries;
    currentLang;
    constructor(i18n, logger) {
        this.i18n = i18n;
        this.logger = logger;
        this.entries = new Map();
        this.currentLang = I18N_DEFAULT_LANG;
    }
    async add(key, value) {
        this.entries.set(key, value);
    }
    async changeLang(lang) {
        this.currentLang = lang;
        this.initCommon();
    }
    async init() {
        this.initCommon();
    }
    initSync() {
        this.initCommon();
    }
    l() {
        return this.currentLang;
    }
    t(key, opts) {
        const v = this.entries.get(key);
        if (v) {
            return this.replacePlaceholders(v, opts);
        }
        if (opts?.fallback) {
            return opts.fallback;
        }
        return key; // Mimic the behavior of some common libraries like i18next
    }
    initCommon() {
        const translations = this.i18n[this.l()];
        this.logger.trace('Initializing I18nManager', { translations });
        if (!translations) {
            return;
        }
        for (const [k, v] of Object.entries(translations)) {
            this.entries.set(k, v);
        }
    }
    tOrNull(key, _opts) {
        return this.entries.get(key) || null;
    }
    replacePlaceholders(v, opts) {
        // DO NOT USE THIS IN PRODUCTION
        // The purpose of it is to have a simple and dependency-less implementation, to play with
        let res = v;
        const placeholders = res.matchAll(SimpleMapI18nManager_1.PLACEHOLDERS_REGEX);
        for (const [placeholder, key] of placeholders) {
            if (!key) {
                continue;
            }
            res = res.replaceAll(placeholder, opts?.vars?.[key] ?? '');
        }
        return res;
    }
};
SimpleMapI18nManager = SimpleMapI18nManager_1 = __decorate([
    injectable(),
    __param(0, inject('I18n')),
    __param(1, inject('Logger')),
    __metadata("design:paramtypes", [Object, Object])
], SimpleMapI18nManager);
export { SimpleMapI18nManager };
