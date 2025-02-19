import type { UIntQuantity } from '../dt/index.js';
import type { I18nLanguageCode, I18nTranslationKey } from '../i18n/types.js';
import type { Initializable } from '../utils/index.js';
export interface I18nManagerTOpts {
    count?: UIntQuantity;
    fallback?: string | undefined;
    vars?: Record<string, string>;
}
export interface I18nManager extends Initializable {
    /**
     * Add a translation key
     *
     * It might not work for all the implementations, depending on where the translations are stored.
     *
     * @param key
     * @param value
     */
    add<K extends I18nTranslationKey>(key: K, value: string): Promise<void>;
    /**
     * Get the current lang code
     */
    l(): I18nLanguageCode;
    /**
     * Get the translation for the given key
     *
     * If the key is missing, it should return `opts.fallback` if any. Otherwise, it should return the key itself.
     *
     * Optionally it can fail (by throwing) but that is not recommended since it impacts end users.
     *
     * @param key
     * @param opts
     */
    t<T extends I18nTranslationKey>(key: T, opts?: I18nManagerTOpts): string;
    /**
     * Get the translation for the given key, otherwise `null`
     * @param key
     * @param opts
     */
    tOrNull<T extends I18nTranslationKey>(key: T, opts?: I18nManagerTOpts): string | null;
}
