import type { UIntQuantity } from '../dt/index.js';
import type { I18nLanguageCode, I18nTranslationKey } from '../i18n/types.js';
import type { Initializable } from '../utils/index.js';
export interface I18nManagerTOpts {
    count?: UIntQuantity;
    fallback?: string | undefined;
    vars?: Record<string, string>;
}
export interface I18nManager extends Initializable {
    add<K extends I18nTranslationKey>(key: K, value: string): Promise<void>;
    l(): I18nLanguageCode;
    t<T extends I18nTranslationKey>(key: T, opts?: I18nManagerTOpts): string;
    tOrNull<T extends I18nTranslationKey>(key: T, opts?: I18nManagerTOpts): string | null;
}
