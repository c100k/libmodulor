import type { ProductI18n } from 'libmodulor';
import { I18nEN } from 'libmodulor/locales/en';

import { I18n as MainI18n } from '../../apps/Toolbox/index';

export const I18n: ProductI18n = {
    en: {
        ...I18nEN,
        ...MainI18n.en,
    },
};
