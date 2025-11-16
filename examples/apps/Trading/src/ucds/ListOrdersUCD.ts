import {
    EverybodyUCPolicy,
    type ListInput,
    ListInputDef,
    SendClientMain,
    type UCDef,
} from '../../../../../dist/esm/index.js';
import { type Order, OrderOPIDef } from '../lib/order.js';
import { Manifest } from '../manifest.js';
import { ListOrdersServerMain } from './ListOrdersServerMain.js';

export interface ListOrdersInput extends ListInput {}

export type ListOrdersOPI0 = Order;

export const ListOrdersUCD: UCDef<ListOrdersInput, ListOrdersOPI0> = {
    io: {
        i: ListInputDef,
        o: {
            parts: {
                _0: OrderOPIDef,
            },
        },
    },
    lifecycle: {
        client: {
            main: SendClientMain,
            policy: EverybodyUCPolicy,
        },
        server: {
            main: ListOrdersServerMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.ListOrders,
};
