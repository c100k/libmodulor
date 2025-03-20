import {
    type Amount,
    TAmount,
    TUIntQuantity,
    type UCOPIBase,
    type UCOutputPartDef,
    type UIntQuantity,
} from 'libmodulor';

import { type ISIN, TISIN } from './TISIN.js';

export interface Order extends UCOPIBase {
    isin: ISIN;
    limit: Amount;
    qty: UIntQuantity;
}

export const OrderOPIDef: UCOutputPartDef<Order> = {
    fields: {
        isin: {
            type: new TISIN(),
        },
        limit: {
            type: new TAmount('EUR'),
        },
        qty: {
            type: new TUIntQuantity(),
        },
    },
};
