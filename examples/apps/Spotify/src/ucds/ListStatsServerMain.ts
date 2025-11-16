import { injectable } from 'inversify';

import {
    type UCMain,
    type UCMainInput,
    type UCOutput,
    UCOutputBuilder,
} from '../../../../../dist/esm/index.js';
import type { ListStatsInput, ListStatsOPI0 } from './ListStatsUCD.js';

@injectable()
export class ListStatsServerMain
    implements UCMain<ListStatsInput, ListStatsOPI0>
{
    public async exec(
        _input: UCMainInput<ListStatsInput, ListStatsOPI0>,
    ): Promise<UCOutput<ListStatsOPI0>> {
        return new UCOutputBuilder<ListStatsOPI0>()
            .add({
                id: 'a6b4b3ce-8729-4123-88df-1ede18d1ffc3',
                name: 'Songs Played',
                value: 9_837_378,
            })
            .get();
    }
}
