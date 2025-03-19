import {
    type AggregateOPI0,
    type Amount,
    EverybodyUCPolicy,
    SendClientMain,
    TAmount,
    TBoolean,
    TUIntQuantity,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UIntQuantity,
} from 'libmodulor';

import { Manifest } from '../manifest.js';

import { type ISIN, TISIN } from '../lib/TISIN.js';
import { BuyAssetServerMain } from './BuyAssetServerMain.js';

export interface BuyAssetInput extends UCInput {
    isin: UCInputFieldValue<ISIN>;
    limit: UCInputFieldValue<Amount>;
    qty: UCInputFieldValue<UIntQuantity>;
}

export interface BuyAssetOPI0 extends AggregateOPI0 {
    executedDirectly: boolean;
}

export const BuyAssetUCD: UCDef<BuyAssetInput, BuyAssetOPI0> = {
    io: {
        i: {
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
            },
        },
        o: {
            parts: {
                _0: {
                    fields: {
                        executedDirectly: {
                            type: new TBoolean(),
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
            main: BuyAssetServerMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.BuyAsset,
};
