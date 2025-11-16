import { inject, injectable } from 'inversify';

import {
    type ListInput,
    recIs,
    rVal0,
    rValArr,
    type UCDataStore,
    type UCMain,
    type UCMainInput,
    type UCOutput,
    UCOutputBuilder,
} from '../../../../../dist/esm/index.js';
import { Manifest } from '../manifest.js';
import type { CreateAlbumInput } from './CreateAlbumUCD.js';
import type { DeleteAlbumInput } from './DeleteAlbumUCD.js';
import type { ListAlbumsInput, ListAlbumsOPI0 } from './ListAlbumsUCD.js';

const { CreateAlbum, DeleteAlbum } = Manifest.ucReg;

@injectable()
export class ListAlbumsServerMain
    implements UCMain<ListAlbumsInput, ListAlbumsOPI0>
{
    constructor(@inject('UCDataStore') private ucDataStore: UCDataStore) {}

    public async exec(
        _input: UCMainInput<ListInput, ListAlbumsOPI0>,
    ): Promise<UCOutput<ListAlbumsOPI0>> {
        const { records } = await this.ucDataStore.read<
            CreateAlbumInput | DeleteAlbumInput
        >({
            filters: {
                name: [CreateAlbum.name, DeleteAlbum.name],
            },
        });

        const ob = new UCOutputBuilder<ListAlbumsOPI0>();

        for (const r of records) {
            if (recIs<CreateAlbumInput>(r, CreateAlbum.name)) {
                ob.add({
                    artist: rVal0(r.input?.artist),
                    description: rVal0(r.input?.description),
                    id: r.aggregateId,
                    isPrivate: rVal0(r.input?.isPrivate),
                    language: rVal0(r.input?.language),
                    name: rVal0(r.input?.name),
                    releaseYear: rVal0(r.input?.releaseYear),
                    tags: rValArr(r.input?.tags),
                });
            } else if (recIs<DeleteAlbumInput>(r, DeleteAlbum.name)) {
                ob.remove((i) => i.id === r.aggregateId);
            }
        }

        return ob.get();
    }
}
