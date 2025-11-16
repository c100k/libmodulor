import {
    type AggregateInput,
    AggregateInputDef,
    RoleAdminUCPolicy,
    SendClientMain,
    type UCDef,
} from '../../../../../dist/esm/index.js';
import { type Order, OrderOPIDef } from '../lib/order.js';
import { Manifest } from '../manifest.js';
import { CancelOrderServerMain } from './CancelOrderServerMain.js';

export type CancelOrderInput = AggregateInput;

export type CancelOrderOPI0 = Order;

export const CancelOrderUCD: UCDef<CancelOrderInput, CancelOrderOPI0> = {
    io: {
        i: AggregateInputDef,
        o: {
            parts: {
                _0: OrderOPIDef,
            },
        },
    },
    lifecycle: {
        client: {
            main: SendClientMain,
            policy: RoleAdminUCPolicy,
        },
        server: {
            main: CancelOrderServerMain,
            policy: RoleAdminUCPolicy,
        },
    },
    metadata: Manifest.ucReg.CancelOrder,
};
