import { injectable } from 'inversify';

import {
    type AppTesterConfiguratorInputFillers,
    type AppTesterCtx,
    allWithExamples,
    allWithExamplesAnd,
    inputFillersForUC,
} from '../../../../dist/esm/index.js';
import { ExampleAppTesterConfigurator } from '../../../ExampleAppTesterConfigurator.js';
import type { AccomodationRepository } from '../src/lib/AccomodationRepository.js';
import { InMemoryAccomodationRepository } from '../src/lib/InMemoryAccomodationRepository.js';
import { SearchAccomodationUCD } from '../src/ucds/SearchAccomodationUCD.js';

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
            inputFillersForUC(SearchAccomodationUCD, {
                ALL_CORRECT_BUT_NEGATIVE_ADULTS_COUNT: allWithExamplesAnd({
                    adultsCount: -10,
                }),
                ALL_CORRECT_BUT_SAME_FROM_AND_TO: (uc) => {
                    allWithExamples(uc);
                    uc.inputField('to').setVal(uc.reqVal0('from'));
                },
                ALL_CORRECT_BUT_TO_BEFORE_FROM: allWithExamplesAnd({
                    to: '2022-07-12',
                }),
            }),
        ]);
    }
}
