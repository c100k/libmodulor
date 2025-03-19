import {
    type Amount,
    EverybodyUCPolicy,
    type ListInput,
    ListInputDef,
    SendClientMain,
    TAmount,
    TUIntQuantity,
    type UCDef,
    type UCOPIBase,
    type UIntQuantity,
} from 'libmodulor';

import { type ISIN, TISIN } from '../lib/TISIN.js';
import { Manifest } from '../manifest.js';
import { ListOrdersServerMain } from './ListOrdersServerMain.js';

export interface ListOrdersInput extends ListInput {}

export interface ListOrdersOPI0 extends UCOPIBase {
    isin: ISIN;
    limit: Amount;
    qty: UIntQuantity;
}

export const ListOrdersUCD: UCDef<ListOrdersInput, ListOrdersOPI0> = {
    io: {
        i: ListInputDef,
        o: {
            parts: {
                _0: {
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
                },
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
