import { inject, injectable } from 'inversify';

import {
    type AggregateOPI0,
    AggregateOutputDef,
    type DateISO8601,
    type FreeTextLong,
    type FreeTextShort,
    IllegalArgumentError,
    NobodyUCPolicy,
    rInput,
    TDateISO8601,
    TFreeTextLong,
    TFreeTextShort,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCMain,
    type UCMainInput,
    type UCOutput,
    UCOutputBuilder,
} from '../../../../../dist/esm/index.js';
import type { ActivityProcessor } from '../lib/ActivityProcessor.js';
import { type ActivityType, TActivityType } from '../lib/TActivityType.js';
import { Manifest } from '../manifest.js';

export interface CreateActivityInput extends UCInput {
    date: UCInputFieldValue<DateISO8601>;
    description: UCInputFieldValue<FreeTextLong>;
    title: UCInputFieldValue<FreeTextShort>;
    type: UCInputFieldValue<ActivityType>;
}

export type CreateActivityOPI0 = AggregateOPI0;

@injectable()
class CreateActivityClientMain
    implements UCMain<CreateActivityInput, CreateActivityOPI0>
{
    constructor(
        @inject('ActivityProcessor')
        private activityProcessor: ActivityProcessor,
    ) {}

    public async exec({
        uc,
    }: UCMainInput<CreateActivityInput, CreateActivityOPI0>): Promise<
        UCOutput<CreateActivityOPI0>
    > {
        const input = rInput(uc);
        const title = uc.reqVal0('title');

        // >=> Check that the name is serious (i.e. not 'toto')
        if (title === 'toto') {
            throw new IllegalArgumentError('validation_format_NotSeriousTitle');
        }

        // >=> Dispatch on the queue for async processing
        await this.activityProcessor.dispatch(input);

        return new UCOutputBuilder<CreateActivityOPI0>()
            .add({ id: 'a6b4b3ce-8729-4123-88df-1ede18d1ffc3' })
            .get();
    }
}

export const CreateActivityUCD: UCDef<CreateActivityInput, CreateActivityOPI0> =
    {
        io: {
            i: {
                fields: {
                    date: {
                        type: new TDateISO8601(),
                    },
                    description: {
                        type: new TFreeTextLong(),
                    },
                    title: {
                        type: new TFreeTextShort().setExamples(['Morning Run']),
                    },
                    type: {
                        type: new TActivityType(),
                    },
                },
            },
            o: AggregateOutputDef,
        },
        lifecycle: {
            client: {
                main: CreateActivityClientMain,
                policy: NobodyUCPolicy,
            },
        },
        metadata: Manifest.ucReg.CreateActivity,
    };
