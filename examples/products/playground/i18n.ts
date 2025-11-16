import { I18nEN } from '../../../dist/esm/i18n/locales/en.js';
import { I18nFR } from '../../../dist/esm/i18n/locales/fr.js';
import type { ProductI18n } from '../../../dist/esm/index.js';
import { I18n as AuthI18n } from '../../apps/Auth/index.js';
import { I18n as SpotifyI18n } from '../../apps/Spotify/index.js';
import { I18n as StravaI18n } from '../../apps/Strava/index.js';
import { I18n as TradingI18n } from '../../apps/Trading/index.js';

export const I18n: ProductI18n = {
    en: {
        ...I18nEN,
        ...AuthI18n.en,
        ...SpotifyI18n.en,
        ...StravaI18n.en,
        ...TradingI18n.en,
        p_desc: 'Each app exposes its use cases with all their specificities : input, output, client, server, policies, etc.',
        p_slogan: 'A libmodulor product showcasing the example apps',
        sse_unavailable: 'SSE is not available yet on RN',
        total: 'Total',
    },
    fr: {
        ...I18nFR,
        ...AuthI18n.fr,
        ...SpotifyI18n.fr,
        ...StravaI18n.fr,
        ...TradingI18n.fr,
        p_desc: 'Chaque app expose ses use cases avec leurs spécificités : entrée, sortie, client, serveur, permissions, etc.',
        p_slogan: "Un produit libmodulor montrant les apps d'exemple",
        sse_unavailable: "SSE n'est pas encore disponible sur RN",
        total: 'Total',
    },
};
