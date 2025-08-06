import { injectable } from 'inversify';
import {
    type AppTesterConfiguratorInputFillers,
    type AppTesterCtx,
    allWithExamples,
    bindCommon,
    type CryptoManager,
    type UC,
    UCInputFieldChangeOperator,
} from 'libmodulor';
import { bindNodeCore, NodeDeterministicCryptoManager } from 'libmodulor/node';
import { SimpleAppTesterConfigurator } from 'libmodulor/node-test';

import type { AccomodationRepository } from '../src/lib/AccomodationRepository.js';
import { InMemoryAccomodationRepository } from '../src/lib/InMemoryAccomodationRepository.js';
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

        container
            .bind<AccomodationRepository>('AccomodationRepository')
            .to(InMemoryAccomodationRepository)
            .inSingletonScope();
        await container
            .get<AccomodationRepository>('AccomodationRepository')
            .init();
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
                        uc.inputField('to').setValue(
                            UCInputFieldChangeOperator.SET,
                            uc.reqVal0('from'),
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
                        uc.inputField('to').setValue(
                            UCInputFieldChangeOperator.SET,
                            '2022-07-12',
                        );
                    },
                },
            ],
        ]);
    }
}
