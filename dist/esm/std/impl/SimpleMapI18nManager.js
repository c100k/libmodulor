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
let SimpleMapI18nManager = class SimpleMapI18nManager {
    static { SimpleMapI18nManager_1 = this; }
    i18n;
    logger;
    static PLACEHOLDERS_REGEX = /{{([A-Z-a-z0-9]+)}}/g; // Note the 'g' so it can be used with `matchAll`
    langs;
    entries;
    currentLang;
    constructor(i18n, logger) {
        this.i18n = i18n;
        this.logger = logger;
        this.langs = Object.keys(i18n);
        if (this.langs.length === 0) {
            throw new Error('I18n must define at least one lang');
        }
        this.entries = new Map();
        // biome-ignore lint/style/noNonNullAssertion: we want it
        this.currentLang = this.langs[0];
    }
    async add(key, value) {
        this.current().set(key, value);
    }
    availableLangs() {
        return this.langs;
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
        const v = this.current().get(key);
        if (v) {
            return this.replacePlaceholders(v, opts);
        }
        if (opts?.fallback) {
            return opts.fallback;
        }
        return key; // Mimic the behavior of some common libraries like i18next
    }
    initCommon() {
        for (const lang of this.langs) {
            const translations = this.i18n[lang];
            this.logger.trace('Initializing I18nManager', {
                lang,
                translations,
            });
            if (!translations) {
                return;
            }
            if (!this.entries.has(lang)) {
                this.entries.set(lang, new Map());
            }
            for (const [k, v] of Object.entries(translations)) {
                this.entries.get(lang)?.set(k, v);
            }
        }
    }
    tOrNull(key, _opts) {
        return this.current().get(key) || null;
    }
    current() {
        const entry = this.entries.get(this.currentLang);
        if (!entry) {
            throw new Error(`I18nManager must contain an entry for lang : ${this.currentLang}`);
        }
        return entry;
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
