import type { ViolationI18nable, YesNo } from '../dt/index.js';
import type { UCClientConfirmConfig, UCExecState, UCWording } from '../uc/index.js';
export type I18nLanguageCode = 'de' | 'en' | 'es' | 'fr';
/**
 * A translation value
 *
 * It can contain `{{placeholders}}`.
 */
export type I18nTranslation = string;
export type I18nTranslationKey = string;
export type I18nCoreKey = ViolationI18nable | `dt_YesNo_${YesNo}_${keyof UCWording}` | `uc_client_confirm_${keyof UCClientConfirmConfig}` | `uc_i_submit_${UCExecState}`;
export type I18nCoreTranslations = Record<I18nCoreKey, I18nTranslation>;
export type I18nSource = any;
export type I18nSourceSafe = {
    I18n: I18n;
};
export type I18nEntry = Record<I18nTranslationKey, I18nTranslation>;
export type I18n = {
    [key in I18nLanguageCode]?: I18nEntry;
};
