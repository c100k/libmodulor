import {
    type Amount,
    EverybodyUCPolicy,
    SendClientMain,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCOPIBase,
} from '../../../../../dist/esm/index.js';
import { TAssetPrice } from '../lib/TAssetPrice.js';
import { type ISIN, TISIN } from '../lib/TISIN.js';
import { Manifest } from '../manifest.js';
import { ViewAssetPriceServerMain } from './ViewAssetPriceServerMain.js';

export interface ViewAssetPriceInput extends UCInput {
    isin: UCInputFieldValue<ISIN>;
}

export interface ViewAssetPriceOPI0 extends UCOPIBase {
    evol: Amount;
    price: Amount;
}

export const ViewAssetPriceUCD: UCDef<ViewAssetPriceInput, ViewAssetPriceOPI0> =
    {
        ext: {
            http: {
                transportType: 'stream',
            },
        },
        io: {
            i: {
                fields: {
                    isin: {
                        type: new TISIN(),
                    },
                },
            },
            o: {
                parts: {
                    _0: {
                        fields: {
                            evol: {
                                type: new TAssetPrice('USD'),
                            },
                            price: {
                                type: new TAssetPrice('USD'),
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
                main: ViewAssetPriceServerMain,
                policy: EverybodyUCPolicy,
            },
        },
        metadata: Manifest.ucReg.ViewAssetPrice,
    };
