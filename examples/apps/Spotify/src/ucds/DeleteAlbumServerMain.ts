import { inject, injectable } from 'inversify';

import type {
    UCMain,
    UCMainInput,
    UCManager,
} from '../../../../../dist/esm/index.js';
import type { DeleteAlbumInput } from './DeleteAlbumUCD.js';

@injectable()
export class DeleteAlbumServerMain implements UCMain<DeleteAlbumInput> {
    constructor(@inject('UCManager') private ucManager: UCManager) {}

    public async exec({ uc }: UCMainInput<DeleteAlbumInput>): Promise<void> {
        const id = uc.reqVal0('id');

        // >=> TODO : Check that the album exists

        // >=> Delete the album if exists
        await this.ucManager.persist(uc, null, { aggregateId: id });
    }
}
