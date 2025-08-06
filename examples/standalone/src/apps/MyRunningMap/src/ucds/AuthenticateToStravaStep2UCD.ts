import { inject, injectable } from 'inversify';
import {
    type ApiKey,
    type CryptoManager,
    type ErrorMessage,
    EverybodyUCPolicy,
    type ExternalServiceId,
    type HTTPAPICaller,
    type I18nManager,
    IllegalArgumentError,
    TApiKey,
    TExternalServiceId,
    TURL,
    type UCDef,
    type UCInput,
    UCInputFieldFillingMode,
    type UCInputFieldValue,
    type UCMain,
    type UCMainInput,
    type UCOPIBase,
    type UCOutput,
    UCOutputBuilder,
    type URL,
} from 'libmodulor';

import { Manifest } from '../manifest.js';

export interface AuthenticateToStravaStep2Input extends UCInput {
    clientId: UCInputFieldValue<ExternalServiceId>;
    clientSecret: UCInputFieldValue<ApiKey>;
    url: UCInputFieldValue<URL>;
}

export interface AuthenticateToStravaStep2OPI0 extends UCOPIBase {
    accessToken: ApiKey;
}

@injectable()
class AuthenticateToStravaStep2ClientMain
    implements
        UCMain<AuthenticateToStravaStep2Input, AuthenticateToStravaStep2OPI0>
{
    constructor(
        @inject('CryptoManager') private cryptoManager: CryptoManager,
        @inject('I18nManager') private i18nManager: I18nManager,
        @inject('HTTPAPICaller') private httpAPICaller: HTTPAPICaller,
    ) {}

    public async exec({
        uc,
    }: UCMainInput<
        AuthenticateToStravaStep2Input,
        AuthenticateToStravaStep2OPI0
    >): Promise<UCOutput<AuthenticateToStravaStep2OPI0>> {
        const clientId = uc.reqVal0('clientId');
        const clientSecret = uc.reqVal0('clientSecret');
        const url = uc.reqVal0('url');

        const parsedURL = new URL(url);
        const code = parsedURL.searchParams.get('code');

        if (!code || !code.trim()) {
            throw new IllegalArgumentError(
                this.i18nManager.t('err_url_code_mandatory'),
            );
        }

        const response = await this.httpAPICaller.exec<
            undefined,
            {
                client_id: string;
                client_secret: string;
                code: ApiKey;
                grant_type: 'authorization_code';
            },
            { message: ErrorMessage },
            { access_token: ApiKey },
            { access_token: ApiKey }
        >({
            errBuilder: async (error) => error.message,
            method: 'POST',
            req: {
                builder: async () => ({
                    client_id: clientId,
                    client_secret: clientSecret,
                    code,
                    grant_type: 'authorization_code',
                }),
                envelope: 'json',
            },
            urlBuilder: async () => 'https://www.strava.com/api/v3/oauth/token',
        });

        return new UCOutputBuilder<AuthenticateToStravaStep2OPI0>()
            .add({
                accessToken: response.access_token,
                id: this.cryptoManager.randomUUID(),
            })
            .get();
    }
}

export const AuthenticateToStravaStep2UCD: UCDef<
    AuthenticateToStravaStep2Input,
    AuthenticateToStravaStep2OPI0
> = {
    io: {
        i: {
            fields: {
                clientId: {
                    type: new TExternalServiceId().setExamples(['12345']),
                },
                clientSecret: {
                    type: new TApiKey(),
                },
                url: {
                    fillingMode: UCInputFieldFillingMode.AUTO_PRE,
                    sensitive: true,
                    type: new TURL(),
                },
            },
        },
        o: {
            parts: {
                _0: {
                    fields: {
                        accessToken: {
                            type: new TApiKey(),
                        },
                    },
                },
            },
        },
    },
    lifecycle: {
        client: {
            main: AuthenticateToStravaStep2ClientMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.AuthenticateToStravaStep2,
};
