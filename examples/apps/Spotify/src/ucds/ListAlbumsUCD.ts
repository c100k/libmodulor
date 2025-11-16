import {
    EverybodyUCPolicy,
    type ListInput,
    ListInputDef,
    SendClientMain,
    type UCDef,
} from '../../../../../dist/esm/index.js';
import { type AlbumOPI0, AlbumOPIDef } from '../lib/album.js';
import { Manifest } from '../manifest.js';
import { ListAlbumsServerMain } from './ListAlbumsServerMain.js';

export type ListAlbumsInput = ListInput;

export type ListAlbumsOPI0 = AlbumOPI0;

export const ListAlbumsUCD: UCDef<ListAlbumsInput, ListAlbumsOPI0> = {
    io: {
        i: ListInputDef,
        o: AlbumOPIDef,
    },
    lifecycle: {
        client: {
            main: SendClientMain,
            policy: EverybodyUCPolicy,
        },
        server: {
            main: ListAlbumsServerMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.ListAlbums,
};
