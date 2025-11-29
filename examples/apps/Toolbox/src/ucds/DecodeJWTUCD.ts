import { inject, injectable } from 'inversify';

import {
    type CryptoManager,
    type EmbeddedObject,
    EverybodyUCPolicy,
    type JWT,
    type JWTManager,
    TEmbeddedObject,
    TJWT,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCMain,
    type UCMainInput,
    type UCOPIBase,
    UCOutputBuilder,
    type UCOutputOrNothing,
} from '../../../../../dist/esm/index.js';
import { Manifest } from '../manifest.js';

export interface DecodeJWTInput extends UCInput {
    jwt: UCInputFieldValue<JWT>;
}

export interface DecodeJWTOPI0 extends UCOPIBase {
    payload: EmbeddedObject;
}

@injectable()
class DecodeJWTClientMain implements UCMain<DecodeJWTInput, DecodeJWTOPI0> {
    constructor(
        @inject('CryptoManager') private cryptoManager: CryptoManager,
        @inject('JWTManager') private jwtManager: JWTManager,
    ) {}

    public async exec({
        uc,
    }: UCMainInput<DecodeJWTInput, DecodeJWTOPI0>): Promise<
        UCOutputOrNothing<DecodeJWTOPI0>
    > {
        const jwt = uc.reqVal0('jwt');

        const id = this.cryptoManager.randomUUID();

        // >=> Decode the JWT
        const payload = await this.jwtManager.decodeUnsafe(jwt);

        return new UCOutputBuilder<DecodeJWTOPI0>()
            .add({
                id,
                payload,
            })
            .get();
    }
}

export const DecodeJWTUCD: UCDef<DecodeJWTInput, DecodeJWTOPI0> = {
    io: {
        i: {
            fields: {
                jwt: {
                    type: new TJWT(),
                },
            },
        },
        o: {
            parts: {
                _0: {
                    fields: {
                        payload: {
                            type: new TEmbeddedObject(),
                        },
                    },
                },
            },
        },
    },
    lifecycle: {
        client: {
            main: DecodeJWTClientMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.DecodeJWT,
};
