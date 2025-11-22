import { type I18n, type I18nLanguageCode, type I18nTranslationKey } from '../../i18n/index.js';
import type { I18nManager, I18nManagerTOpts } from '../I18nManager.js';
import type { Logger } from '../Logger.js';
export declare class SimpleMapI18nManager implements I18nManager {
    private i18n;
    private logger;
    private static PLACEHOLDERS_REGEX;
    private entries;
    private currentLang;
    constructor(i18n: I18n, logger: Logger);
    add<K extends I18nTranslationKey>(key: K, value: string): Promise<void>;
    changeLang(lang: I18nLanguageCode): Promise<void>;
    init(): Promise<void>;
    initSync(): void;
    l(): I18nLanguageCode;
    t<K extends I18nTranslationKey>(key: K, opts?: I18nManagerTOpts): string;
    private initCommon;
    tOrNull<K extends I18nTranslationKey>(key: K, _opts?: I18nManagerTOpts): string | null;
    private replacePlaceholders;
}
