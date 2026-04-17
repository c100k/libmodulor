import type { TFileConstraints, TStringConstraints, ViolationI18nable, YesNo } from '../dt/index.js';
import type { UCClientConfirmConfig, UCExecState, UCWording } from '../uc/index.js';
export type I18nLanguageCode = 'de' | 'en' | 'es' | 'fr';
/**
 * A translation value
 *
 * It can contain `{{placeholders}}`.
 */
export type I18nTranslation = string;
export type I18nTranslationKey = string;
export type I18nCoreKey = ViolationI18nable | `dt_FreeTextShort_constr_${keyof TStringConstraints}` | `dt_File_constr_${keyof TFileConstraints}` | `dt_YesNo_${YesNo}_${keyof UCWording}` | 'err_forbidden' | 'err_illegal_argument' | 'err_not_found' | 'err_uc_data_store_not_readable' | 'err_uc_data_store_not_writable' | 'err_unauthorized' | 'err_unavailable' | 'err_unexpected' | `uc_client_confirm_${keyof UCClientConfirmConfig}` | `uc_i_submit_${UCExecState}`;
export type I18nCoreTranslations = Record<I18nCoreKey, I18nTranslation>;
export type I18nSource = any;
export type I18nSourceSafe = {
    I18n: I18n;
};
export type I18nEntry = Record<I18nTranslationKey, I18nTranslation>;
export type I18n = {
    [key in I18nLanguageCode]?: I18nEntry;
};
