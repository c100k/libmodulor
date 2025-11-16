import {
    type Amount,
    AuthenticatedUCPolicy,
    SendClientMain,
    TAmount,
    TUIntQuantity,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UIntQuantity,
} from '../../../../../dist/esm/index.js';
import { type Order, OrderOPIDef } from '../lib/order.js';
import { type ISIN, TISIN } from '../lib/TISIN.js';
import { Manifest } from '../manifest.js';
import { BuyAssetServerMain } from './BuyAssetServerMain.js';

export interface BuyAssetInput extends UCInput {
    isin: UCInputFieldValue<ISIN>;
    limit: UCInputFieldValue<Amount>;
    qty: UCInputFieldValue<UIntQuantity>;
}

export type BuyAssetOPI0 = Order;

export const BuyAssetUCD: UCDef<BuyAssetInput, BuyAssetOPI0> = {
    io: {
        i: {
            fields: {
                isin: {
                    type: new TISIN(),
                },
                limit: {
                    type: new TAmount('USD', { min: 0 }),
                },
                qty: {
                    type: new TUIntQuantity(),
                },
            },
        },
        o: {
            parts: {
                _0: OrderOPIDef,
            },
        },
    },
    lifecycle: {
        client: {
            main: SendClientMain,
            policy: AuthenticatedUCPolicy,
        },
        server: {
            main: BuyAssetServerMain,
            policy: AuthenticatedUCPolicy,
        },
    },
    metadata: Manifest.ucReg.BuyAsset,
};
