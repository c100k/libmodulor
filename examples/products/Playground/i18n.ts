import { I18nDE } from '../../../dist/esm/i18n/locales/de.js';
import { I18nEN } from '../../../dist/esm/i18n/locales/en.js';
import { I18nES } from '../../../dist/esm/i18n/locales/es.js';
import { I18nFR } from '../../../dist/esm/i18n/locales/fr.js';
import type { ProductI18n } from '../../../dist/esm/index.js';
import { I18n as AuthI18n } from '../../apps/Auth/index.js';
import { I18n as SpotifyI18n } from '../../apps/Spotify/index.js';
import { I18n as StravaI18n } from '../../apps/Strava/index.js';
import { I18n as TradingI18n } from '../../apps/Trading/index.js';

export const I18n = {
    de: {
        ...I18nDE,
        ...AuthI18n.de,
        ...SpotifyI18n.de,
    },
    en: {
        ...I18nEN,
        ...AuthI18n.en,
        ...SpotifyI18n.en,
        ...StravaI18n.en,
        ...TradingI18n.en,
        p_desc: 'Three Apps showing how libmodulor works under the hood.',
        p_slogan: 'The libmodulor sandbox',
        sse_unavailable: 'SSE is not available yet on RN',
        total: 'Total',
    },
    es: {
        ...I18nES,
        ...AuthI18n.es,
        ...SpotifyI18n.es,
    },
    fr: {
        ...I18nFR,
        ...AuthI18n.fr,
        ...SpotifyI18n.fr,
        ...StravaI18n.fr,
        ...TradingI18n.fr,
        p_desc: 'Trois apps montrant comment libmodulor fonctionne sous le capot.',
        p_slogan: 'Le bac à sable libmodulor',
        sse_unavailable: "SSE n'est pas encore disponible sur RN",
        total: 'Total',
    },
} satisfies ProductI18n;
