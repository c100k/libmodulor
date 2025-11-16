import { injectable } from 'inversify';

import {
    type AppTesterConfiguratorInputFillers,
    type AppTesterCtx,
    allWithExamples,
    type UC,
} from '../../../../dist/esm/index.js';
import { ExampleAppTesterConfigurator } from '../../../ExampleAppTesterConfigurator.js';
import type { AccomodationRepository } from '../src/lib/AccomodationRepository.js';
import { InMemoryAccomodationRepository } from '../src/lib/InMemoryAccomodationRepository.js';
import { Manifest } from '../src/manifest.js';
import type {
    SearchAccomodationInput,
    SearchAccomodationOPI0,
} from '../src/ucds/SearchAccomodationUCD.js';

const { SearchAccomodation } = Manifest.ucReg;

@injectable()
export class Configurator extends ExampleAppTesterConfigurator {
    public override async bindImplementations(
        ctx: AppTesterCtx,
    ): Promise<void> {
        await super.bindImplementations(ctx);

        const { container } = ctx;

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
                        uc.inputField('to').setVal(uc.reqVal0('from'));
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
                        uc.inputField('to').setVal('2022-07-12');
                    },
                },
            ],
        ]);
    }
}
