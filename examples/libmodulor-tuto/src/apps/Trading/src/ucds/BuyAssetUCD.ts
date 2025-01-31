import { inject, injectable } from 'inversify';
import {
    type AggregateOPI0,
    type Amount,
    EverybodyUCPolicy,
    TAmount,
    TBoolean,
    TUIntQuantity,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCMain,
    type UCMainInput,
    type UCOutputOrNothing,
    type UCTransporter,
    type UIntQuantity,
} from 'libmodulor';

import { Manifest } from '../manifest.js';

import { type ISIN, TISIN } from '../dt/TISIN.js';
import { BuyAssetServerMain } from './BuyAssetServerMain.js';

export interface BuyAssetInput extends UCInput {
    isin: UCInputFieldValue<ISIN>;
    limit: UCInputFieldValue<Amount>;
    qty: UCInputFieldValue<UIntQuantity>;
}

export interface BuyAssetOPI0 extends AggregateOPI0 {
    executedDirectly: boolean;
}

@injectable()
class BuyAssetClientMain implements UCMain<BuyAssetInput, BuyAssetOPI0> {
    constructor(
        @inject('UCTransporter')
        private ucTransporter: UCTransporter,
    ) {}

    public async exec({
        uc,
    }: UCMainInput<BuyAssetInput, BuyAssetOPI0>): Promise<
        UCOutputOrNothing<BuyAssetOPI0>
    > {
        return this.ucTransporter.send(uc);
    }
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
            main: BuyAssetClientMain,
            policy: EverybodyUCPolicy,
        },
        server: {
            main: BuyAssetServerMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.BuyAsset,
};
