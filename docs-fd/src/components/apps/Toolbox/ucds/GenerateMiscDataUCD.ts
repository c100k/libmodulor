import { inject, injectable } from 'inversify';
import {
    type ClockManager,
    type CryptoManager,
    EverybodyUCPolicy,
    type FreeTextShort,
    range,
    TFreeTextShort,
    TUIntQuantity,
    TUUID,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCMain,
    type UCMainInput,
    type UCOPIBase,
    type UCOutput,
    UCOutputBuilder,
    type UIntQuantity,
    type UUID,
} from 'libmodulor';

import { Manifest } from '../manifest';

export interface GenerateMiscDataInput extends UCInput {
    uuidCount: UCInputFieldValue<UIntQuantity>;
}

export interface GenerateMiscDataOPI0 extends UCOPIBase {
    label: FreeTextShort;
    value: FreeTextShort;
}

export interface GenerateMiscDataOPI1 extends UCOPIBase {
    value: UUID;
}

@injectable()
class GenerateMiscDataClientMain
    implements
        UCMain<
            GenerateMiscDataInput,
            GenerateMiscDataOPI0,
            GenerateMiscDataOPI1
        >
{
    constructor(
        @inject('ClockManager') private clockManager: ClockManager,
        @inject('CryptoManager')
        private cryptoManager: CryptoManager,
    ) {}

    public async exec({
        uc,
    }: UCMainInput<
        GenerateMiscDataInput,
        GenerateMiscDataOPI0,
        GenerateMiscDataOPI1
    >): Promise<UCOutput<GenerateMiscDataOPI0, GenerateMiscDataOPI1>> {
        const uuidCount = uc.reqVal0<UIntQuantity>('uuidCount');

        return new UCOutputBuilder<GenerateMiscDataOPI0, GenerateMiscDataOPI1>()
            .add({
                id: this.cryptoManager.randomUUID(),
                label: 'Timestamp',
                value: this.clockManager.time().toString(),
            })
            .addAll1(
                range(uuidCount).map(() => ({
                    id: this.cryptoManager.randomUUID(),
                    value: this.cryptoManager.randomUUID(),
                })),
            )
            .get();
    }
}

export const GenerateMiscDataUCD: UCDef<
    GenerateMiscDataInput,
    GenerateMiscDataOPI0,
    GenerateMiscDataOPI1
> = {
    io: {
        i: {
            fields: {
                uuidCount: {
                    cardinality: {
                        min: 0,
                    },
                    type: new TUIntQuantity({
                        max: 100,
                    })
                        .setDefaultValue(3)
                        .setInitialValue(12),
                },
            },
        },
        o: {
            parts: {
                _0: {
                    fields: {
                        label: {
                            type: new TFreeTextShort(),
                        },
                        value: {
                            type: new TFreeTextShort(),
                        },
                    },
                },
                _1: {
                    fields: {
                        value: {
                            type: new TUUID(),
                        },
                    },
                },
            },
        },
    },
    lifecycle: {
        client: {
            main: GenerateMiscDataClientMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.GenerateMiscData,
};
