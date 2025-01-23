import { I18n as HelperI18n } from '../../apps/Helper/index.js';
import { I18nEN } from '../../i18n/locales/en.js';
export const I18n = {
    en: {
        ...I18nEN,
        ...HelperI18n.en,
        p_desc: 'Helper to perform actions related to apps, use cases, etc.',
        p_slogan: 'A Helper to help you',
    },
};
