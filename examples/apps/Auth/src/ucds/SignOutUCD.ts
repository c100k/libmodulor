import {
    AuthenticatedUCPolicy,
    IdleServerMain,
    SendClientMain,
    type UCDef,
    UCOutputSideEffectType,
} from '../../../../../dist/esm/index.js';
import { Manifest } from '../manifest.js';

export const SignOutUCD: UCDef = {
    io: {
        o: {
            sideEffects: [{ type: UCOutputSideEffectType.CLEAR_AUTH }],
        },
    },
    lifecycle: {
        client: {
            main: SendClientMain,
            policy: AuthenticatedUCPolicy,
        },
        server: {
            main: IdleServerMain,
            policy: AuthenticatedUCPolicy,
        },
    },
    metadata: Manifest.ucReg.SignOut,
};
