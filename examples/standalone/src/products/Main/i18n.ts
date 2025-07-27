import type { ProductI18n } from 'libmodulor';
import { I18nEN } from 'libmodulor/locales/en';

import { I18n as MyRunningMapI18n } from '../../apps/MyRunningMap/index.js';
import { I18n as MyTripI18n } from '../../apps/MyTrip/index.js';
import { I18n as ToolboxI18n } from '../../apps/Toolbox/index.js';

export const I18n: ProductI18n = {
    en: {
        ...I18nEN,
        ...MyTripI18n.en,
        ...MyRunningMapI18n.en,
        ...ToolboxI18n.en,
    },
};
