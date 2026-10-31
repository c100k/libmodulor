import {
    AnonymousUCPolicy,
    type JWT,
    SendClientMain,
    TJWT,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCOPIBase,
    UCOutputSideEffectType,
} from '../../../../../dist/esm/index.js';
import { type Role, TRole } from '../lib/TRole.js';
import { Manifest } from '../manifest.js';
import { SignInServerMain } from './SignInServerMain.js';

export interface SignInInput extends UCInput {
    role: UCInputFieldValue<Role>;
}

export interface SignInOPI0 extends UCOPIBase {
    jwt: JWT;
}

export const SignInUCD: UCDef<SignInInput, SignInOPI0> = {
    io: {
        i: {
            fields: {
                role: {
                    type: new TRole(),
                },
            },
        },
        o: {
            parts: {
                _0: {
                    fields: {
                        jwt: {
                            type: new TJWT(),
                        },
                    },
                },
            },
            sideEffects: [{ type: UCOutputSideEffectType.SET_AUTH }],
        },
    },
    lifecycle: {
        client: {
            main: SendClientMain,
            policy: AnonymousUCPolicy,
        },
        server: {
            main: SignInServerMain,
            policy: AnonymousUCPolicy,
        },
    },
    metadata: Manifest.ucReg.SignIn,
};
