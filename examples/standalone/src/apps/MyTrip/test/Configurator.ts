import { injectable } from 'inversify';
import {
    type AppTesterConfiguratorInputFillers,
    type AppTesterCtx,
    allWithExamples,
    bindCommon,
    type CryptoManager,
    type DateISO8601,
    type UC,
    UCInputFieldChangeOperator,
} from 'libmodulor';
import { bindNodeCore, NodeDeterministicCryptoManager } from 'libmodulor/node';
import { SimpleAppTesterConfigurator } from 'libmodulor/node-test';

import { Manifest } from '../src/manifest.js';
import type {
    SearchAccomodationInput,
    SearchAccomodationOPI0,
} from '../src/ucds/SearchAccomodationUCD.js';

const { SearchAccomodation } = Manifest.ucReg;

@injectable()
export class Configurator extends SimpleAppTesterConfigurator {
    public override async bindImplementations(
        ctx: AppTesterCtx,
    ): Promise<void> {
        await super.bindImplementations(ctx);

        const { container } = ctx;

        bindCommon(container);
        bindNodeCore(container);

        (await container.rebind<CryptoManager>('CryptoManager')).to(
            NodeDeterministicCryptoManager,
        );
    }

    public override async inputFillers(): Promise<
        AppTesterConfiguratorInputFillers | undefined
    > {
        return new Map([
            [
                SearchAccomodation.name,
                {
                    ALL_CORRECT_BUT_SAME_FROM_AND_TO: (
                        uc: UC<SearchAccomodationInput, SearchAccomodationOPI0>,
                    ): void => {
                        allWithExamples(uc);
                        uc.inputField<DateISO8601>('to').setValue(
                            UCInputFieldChangeOperator.SET,
                            uc.reqVal0<DateISO8601>('from'),
                        );
                    },
                },
            ],
            [
                SearchAccomodation.name,
                {
                    ALL_CORRECT_BUT_TO_BEFORE_FROM: (
                        uc: UC<SearchAccomodationInput, SearchAccomodationOPI0>,
                    ): void => {
                        allWithExamples(uc);
                        uc.inputField<DateISO8601>('to').setValue(
                            UCInputFieldChangeOperator.SET,
                            '2022-07-12',
                        );
                    },
                },
            ],
        ]);
    }
}
