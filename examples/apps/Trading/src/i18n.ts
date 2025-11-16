import type { AppI18n } from '../../../../dist/esm/index.js';

export const I18n: AppI18n = {
    en: {
        err_isin_price_not_found: 'Cannot find the price of this ISIN',
        err_order_uncancellable: 'Cannot cancel an order that is not pending',
        uc_AskQuestion_i_submit_idle: 'Ask',
        uc_AskQuestion_i_submit_submitting: 'Thinking',
        uc_BuyAsset_i_submit_idle: 'Send buy order',
        uc_BuyAsset_i_submit_submitting: 'Sending',
        uc_BuyAsset_label: 'Buy an asset',
        uc_CancelOrder_i_submit_idle: 'Cancel',
        uc_CancelOrder_i_submit_submitting: 'Cancelling',
        uc_CancelOrder_label: 'Cancel',
        uc_ListOrders_label: 'Orders',
        uc_ListOrders_op_0_empty:
            'Buy your first asset and start making big $$$',
        ucif_isin_label: 'ISIN',
        ucif_qty_label: 'Quantity',
        ucof_id_label: 'Identifier',
        ucof_isin_label: 'ISIN',
        ucof_qty_label: 'Quantity',
        validation_format_ISIN:
            'Must be 2 uppercase letters, followed by 9 alphanumeric characters and 1 digit',
    },
};
