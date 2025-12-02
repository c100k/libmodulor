import {
    type AggregateInput,
    AggregateInputDef,
    type EmbeddedObject,
    EverybodyUCPolicy,
    SendClientMain,
    TEmbeddedObject,
    type UCDef,
    type UCOPIBase,
    type UIntDuration,
} from '../../../../../dist/esm/index.js';
import { Manifest } from '../manifest.js';
import { PlaySongServerMain } from './PlaySongServerMain.js';

export type PlaySongInput = AggregateInput;

export interface PlaySongOPI0 extends UCOPIBase {
    duration: EmbeddedObject<{
        hours: UIntDuration;
        minutes: UIntDuration;
        seconds: UIntDuration;
    }>;
}

export const PlaySongUCD: UCDef<PlaySongInput, PlaySongOPI0> = {
    ext: {
        http: {
            transportType: 'stream',
        },
    },
    io: {
        i: AggregateInputDef,
        o: {
            parts: {
                _0: {
                    fields: {
                        duration: {
                            type: new TEmbeddedObject(),
                        },
                    },
                },
            },
        },
    },
    lifecycle: {
        client: {
            main: SendClientMain,
            policy: EverybodyUCPolicy,
        },
        server: { main: PlaySongServerMain, policy: EverybodyUCPolicy },
    },
    metadata: Manifest.ucReg.PlaySong,
};
