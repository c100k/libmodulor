import type { ProductI18n } from 'libmodulor';
import { I18nEN } from 'libmodulor/locales/en';

import { I18n as TradingI18n } from '../../apps/Trading/index.js';

export const I18n: ProductI18n = {
    en: {
        ...I18nEN,
        ...TradingI18n.en,
        p_desc: 'A simple app to trade crypto, shares and other assets',
        p_slogan: 'Trading made simple',
        total: 'Total',
    },
};
