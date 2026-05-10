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
        // Voluntarily omitting some translations
        // ...StravaI18n.de,
        // ...TradingI18n.de,
        openapi_redoc_online: 'Redoc (Online)',
        openapi_spec: 'OpenAPI-Spezifikation',
        openapi_swagger_docker: 'Swagger UI (Docker)',
        openapi_swagger_online: 'Swagger Editor (Online)',
        p_desc: 'Drei Apps, die zeigen, wie libmodulor unter der Haube funktioniert.',
        p_slogan: 'Die libmodulor-Sandbox',
        sse_unavailable: 'SSE ist auf RN noch nicht verfügbar',
        total: 'Gesamt',
    },
    en: {
        ...I18nEN,
        ...AuthI18n.en,
        ...SpotifyI18n.en,
        ...StravaI18n.en,
        ...TradingI18n.en,
        openapi_redoc_online: 'Redoc (Online)',
        openapi_spec: 'OpenAPI Spec',
        openapi_swagger_docker: 'Swagger UI (Docker)',
        openapi_swagger_online: 'Swagger Editor (Online)',
        p_desc: 'Three Apps showing how libmodulor works under the hood.',
        p_slogan: 'The libmodulor sandbox',
        sse_unavailable: 'SSE is not available yet on RN',
        total: 'Total',
    },
    es: {
        ...I18nES,
        ...AuthI18n.es,
        ...SpotifyI18n.es,
        // Voluntarily omitting some translations
        // ...StravaI18n.de,
        // ...TradingI18n.de,
        openapi_redoc_online: 'Redoc (En línea)',
        openapi_spec: 'Especificación OpenAPI',
        openapi_swagger_docker: 'Swagger UI (Docker)',
        openapi_swagger_online: 'Swagger Editor (En línea)',
        p_desc: 'Tres aplicaciones que muestran cómo funciona libmodulor internamente.',
        p_slogan: 'El entorno de pruebas de libmodulor',
        sse_unavailable: 'SSE aún no está disponible en RN',
        total: 'Total',
    },
    fr: {
        ...I18nFR,
        ...AuthI18n.fr,
        ...SpotifyI18n.fr,
        ...StravaI18n.fr,
        ...TradingI18n.fr,
        openapi_redoc_online: 'Redoc (En ligne)',
        openapi_spec: 'Spec OpenAPI',
        openapi_swagger_docker: 'Swagger UI (Docker)',
        openapi_swagger_online: 'Swagger Editor (En ligne)',
        p_desc: 'Trois apps montrant comment libmodulor fonctionne sous le capot.',
        p_slogan: 'Le bac à sable libmodulor',
        sse_unavailable: "SSE n'est pas encore disponible sur RN",
        total: 'Total',
    },
} satisfies ProductI18n;
