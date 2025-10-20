import {
    type Amount,
    EverybodyUCPolicy,
    SendClientMain,
    TAmount,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCOPIBase,
} from 'libmodulor';

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
                                type: new TAmount('USD').setSemanticsPredicate(
                                    (v) => {
                                        if (v < 0) {
                                            return { variant: 'danger' };
                                        }
                                        if (v > 0) {
                                            return { variant: 'success' };
                                        }
                                        return {};
                                    },
                                ),
                            },
                            price: {
                                type: new TAmount('USD'),
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
