import type { AppI18n } from '../../../../dist/esm/index.js';

export const I18n = {
    en: {
        uc_CreateActivity_i_submit_idle: 'Post',
        uc_CreateActivity_i_submit_submitting: 'Posting',
        uc_CreateActivity_label: 'Create an activity',
        validation_format_NotSeriousTitle: 'Come on ! Use a serious title',
    },
    fr: {
        uc_CreateActivity_i_submit_idle: 'Poster',
        uc_CreateActivity_i_submit_submitting: 'Envoi',
        uc_CreateActivity_label: 'Créer une activité',
        ucif_date_label: 'Date',
        ucif_description_label: 'Description',
        ucif_title_label: 'Titre',
        ucif_type_label: 'Type',
        ucof_id_label: 'Identifiant',
        validation_format_NotSeriousTitle: 'Voyons ! Utilisez un titre sérieux',
    },
} satisfies AppI18n;
