import type { AppI18n } from '../../../../dist/esm/index.js';

export const I18n: AppI18n = {
    en: {
        err_url_code_mandatory: 'The URL must contain a code query param',
        uc_AuthenticateToStravaStep1_desc:
            'Redirect to Strava in order to start the OAuth2 dance.',
        uc_AuthenticateToStravaStep1_i_submit_idle: 'Start',
        uc_AuthenticateToStravaStep1_i_submit_submitting: 'Starting',
        uc_AuthenticateToStravaStep2_desc:
            'Retrieve a Strava access token in order to fetch the activities.',
        uc_AuthenticateToStravaStep2_i_submit_idle: 'Authenticate',
        uc_AuthenticateToStravaStep2_i_submit_submitting: 'Authenticating',
        uc_GenerateRunningMapFromStrava_desc:
            'Fetch the activities from Strava and build a static map on Mapbox centered on these activities.',
        uc_GenerateRunningMapFromStrava_i_submit_idle: 'Generate',
        uc_GenerateRunningMapFromStrava_i_submit_submitting: 'Generating',
        ucif_activitiesCount_desc:
            'Activities are retrieved by most recent first. So if you set 10 here, you will get the last 10 activities. This value will determine the shape of the Map since it is centered according to the data points.',
        ucif_clientId_label: 'Client ID',
    },
};
