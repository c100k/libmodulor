import {
    type Amount,
    TAmount,
    TUIntQuantity,
    type UCOPIBase,
    type UCOutputPartDef,
    type UIntQuantity,
} from '../../../../../dist/esm/index.js';
import { type ISIN, TISIN } from './TISIN.js';
import { type OrderStatus, TOrderStatus } from './TOrderStatus.js';

export interface Order extends UCOPIBase {
    isin: ISIN;
    limit: Amount;
    qty: UIntQuantity;
    status: OrderStatus;
}

export const OrderOPIDef: UCOutputPartDef<Order> = {
    fields: {
        isin: {
            type: new TISIN(),
        },
        limit: {
            type: new TAmount('USD'),
        },
        qty: {
            type: new TUIntQuantity(),
        },
        status: {
            type: new TOrderStatus(),
        },
    },
};
