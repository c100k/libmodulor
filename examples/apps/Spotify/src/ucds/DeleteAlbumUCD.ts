import {
    type AggregateInput,
    AggregateInputDef,
    EverybodyUCPolicy,
    SendClientMain,
    type UCDef,
} from '../../../../../dist/esm/index.js';
import { Manifest } from '../manifest.js';
import { DeleteAlbumServerMain } from './DeleteAlbumServerMain.js';

export type DeleteAlbumInput = AggregateInput;

export const DeleteAlbumUCD: UCDef<DeleteAlbumInput> = {
    io: {
        i: AggregateInputDef,
    },
    lifecycle: {
        client: {
            main: SendClientMain,
            policy: EverybodyUCPolicy,
        },
        server: {
            main: DeleteAlbumServerMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.DeleteAlbum,
};
