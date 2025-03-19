import { injectable } from 'inversify';
import type { UCMain, UCMainInput, UCOutput } from 'libmodulor';

import type { ListOrdersInput, ListOrdersOPI0 } from './ListOrdersUCD.js';

@injectable()
export class ListOrdersServerMain
    implements UCMain<ListOrdersInput, ListOrdersOPI0>
{
    public async exec(
        _input: UCMainInput<ListOrdersInput, ListOrdersOPI0>,
    ): Promise<UCOutput<ListOrdersOPI0>> {
        throw new Error('Method not implemented.');
    }
}
