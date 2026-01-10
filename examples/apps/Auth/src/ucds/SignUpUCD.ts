import {
    AnonymousUCPolicy,
    type JWT,
    SendClientMain,
    TEmail,
    TJWT,
    TPassword,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCOPIBase,
    UCOutputSideEffectType,
} from '../../../../../dist/esm/index.js';
import { Manifest } from '../manifest.js';
import { SignUpServerMain } from './SignUpServerMain.js';

export interface SignUpInput extends UCInput {
    email: UCInputFieldValue<string>;
    password: UCInputFieldValue<string>;
}

export interface SignUpOPI0 extends UCOPIBase {
    jwt: JWT;
}

export const SignUpUCD: UCDef<SignUpInput, SignUpOPI0> = {
    io: {
        i: {
            fields: {
                email: {
                    type: new TEmail(),
                },
                password: {
                    type: new TPassword(),
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
            main: SignUpServerMain,
            policy: AnonymousUCPolicy,
        },
    },
    metadata: Manifest.ucReg.SignUp,
};
