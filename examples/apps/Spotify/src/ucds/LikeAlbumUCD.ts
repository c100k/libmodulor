import {
    type AggregateInput,
    AggregateInputDef,
    EverybodyUCPolicy,
    IdleServerMain,
    SendClientMain,
    type UCDef,
} from '../../../../../dist/esm/index.js';
import { Manifest } from '../manifest.js';

export interface LikeAlbumInput extends AggregateInput {}

export const LikeAlbumUCD: UCDef<LikeAlbumInput> = {
    io: {
        i: AggregateInputDef,
    },
    lifecycle: {
        client: {
            main: SendClientMain,
            policy: EverybodyUCPolicy,
        },
        server: { main: IdleServerMain, policy: EverybodyUCPolicy },
    },
    metadata: Manifest.ucReg.LikeAlbum,
};
