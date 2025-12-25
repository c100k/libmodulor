import type { AppI18n } from '../../../../dist/esm/index.js';

export const I18n = {
    en: {
        err_from_before_to:
            'The check-in date must be before the check-out date',
        uc_SearchAccomodation_desc:
            "As if you were on Kayak or Booking, search for an accomodation. For now, it's plugged on a limited in-memory data store, so search for 'France' and 2 adults to get a result.",
        uc_SearchAccomodation_i_submit_idle: 'Search',
        uc_SearchAccomodation_i_submit_submitting: 'Searching',
        ucif_adultsCount_label: 'Nb of adults',
        ucif_childrenCount_label: 'Nb of children',
        ucif_country_label: 'Which country are you visiting ?',
        ucif_from_label: 'From when ?',
        ucif_roomsCount_label: 'Nb of rooms',
        ucif_to_label: 'To when ?',
    },
} satisfies AppI18n;
