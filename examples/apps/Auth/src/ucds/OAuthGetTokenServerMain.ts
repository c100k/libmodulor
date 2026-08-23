import { inject, injectable } from 'inversify';

import {
    type CryptoManager,
    FAKE_USER_ADMIN,
    type JWTManager,
    type Logger,
    type UCMain,
    type UCMainInput,
    type UCOutput,
    UCOutputBuilder,
} from '../../../../../dist/esm/index.js';
import type {
    OAuthGetTokenInput,
    OAuthGetTokenOPI0,
} from './OAuthGetTokenUCD.js';

@injectable()
export class OAuthGetTokenServerMain
    implements UCMain<OAuthGetTokenInput, OAuthGetTokenOPI0>
{
    constructor(
        @inject('CryptoManager') private cryptoManager: CryptoManager,
        @inject('JWTManager')
        private jwtManager: JWTManager,
        @inject('Logger') private logger: Logger,
    ) {}

    public async exec({
        uc,
    }: UCMainInput<OAuthGetTokenInput, OAuthGetTokenOPI0>): Promise<
        UCOutput<OAuthGetTokenOPI0>
    > {
        const clientId = uc.reqVal0('client_id');
        const clientSecret = uc.reqVal0('client_secret');
        const code = uc.reqVal0('code');
        const codeVerifier = uc.reqVal0('code_verifier');
        const redirectURI = uc.reqVal0('redirect_uri');

        // DO NOT USE THIS IN PRODUCTION !!!

        this.logger.debug('OAuth2', {
            clientId,
            clientSecret,
            code,
            codeVerifier,
            redirectURI,
        });

        const auth = FAKE_USER_ADMIN;
        const jwt = await this.jwtManager.encode(auth);

        const item: OAuthGetTokenOPI0 = {
            access_token: jwt,
            expires_in: 3600,
            id: this.cryptoManager.randomUUID(),
            refresh_token: null,
            token_type: 'Bearer',
        };

        return new UCOutputBuilder<OAuthGetTokenOPI0>().add(item).get();
    }
}
