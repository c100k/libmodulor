import {
    type ApiKey,
    EverybodyUCPolicy,
    SendClientMain,
    TApiKey,
    TJWT,
    TUIntDuration,
    TURL,
    TUUID,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCOPIBase,
    type UIntDuration,
    type URL,
    type UUID,
} from '../../../../../dist/esm/index.js';
import {
    type OAuthGrantType,
    TOAuthGrantType,
} from '../lib/TOAuthGrantType.js';
import {
    type OAuthTokenType,
    TOAuthTokenType,
} from '../lib/TOAuthTokenType.js';
import { Manifest } from '../manifest.js';
import { OAuthGetTokenServerMain } from './OAuthGetTokenServerMain.js';

export interface OAuthGetTokenInput extends UCInput {
    client_id: UCInputFieldValue<UUID>;
    client_secret: UCInputFieldValue<ApiKey>;
    code: UCInputFieldValue<ApiKey>;
    code_verifier: UCInputFieldValue<ApiKey>;
    grant_type: UCInputFieldValue<OAuthGrantType>;
    redirect_uri: UCInputFieldValue<URL>;
}

export interface OAuthGetTokenOPI0 extends UCOPIBase {
    access_token: ApiKey;
    expires_in: UIntDuration;
    refresh_token: ApiKey | null;
    token_type: OAuthTokenType;
}

export const OAuthGetTokenUCD: UCDef<OAuthGetTokenInput, OAuthGetTokenOPI0> = {
    ext: {
        http: {
            externalSpecResponse:
                'https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.4',
            mountAt: '/api/v1/oauth/token',
        },
    },
    io: {
        i: {
            fields: {
                client_id: {
                    type: new TUUID(),
                },
                client_secret: {
                    type: new TApiKey(),
                },
                code: {
                    type: new TApiKey(),
                },
                code_verifier: {
                    type: new TApiKey(),
                },
                grant_type: {
                    type: new TOAuthGrantType(),
                },
                redirect_uri: {
                    type: new TURL(),
                },
            },
        },
        o: {
            parts: {
                _0: {
                    fields: {
                        access_token: {
                            type: new TJWT(),
                        },
                        expires_in: {
                            type: new TUIntDuration(),
                        },
                        refresh_token: {
                            cardinality: {
                                min: 0,
                            },
                            type: new TJWT(),
                        },
                        token_type: {
                            type: new TOAuthTokenType(),
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
        server: {
            main: OAuthGetTokenServerMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.OAuthGetToken,
};
