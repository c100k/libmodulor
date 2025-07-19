import { inject, injectable } from 'inversify';
import {
    EverybodyUCPolicy,
    type ExternalServiceId,
    TExternalServiceId,
    TURL,
    type UCDef,
    type UCInput,
    UCInputFieldFillingMode,
    type UCInputFieldValue,
    type UCMain,
    type UCMainInput,
    type URL as URLString,
} from 'libmodulor';

import type { LinkManager } from '../lib/link/LinkManager.js';
import { Manifest } from '../manifest.js';

export interface AuthenticateToStravaStep1Input extends UCInput {
    clientId: UCInputFieldValue<ExternalServiceId>;
    redirectURI: UCInputFieldValue<URL>;
}

@injectable()
export class AuthenticateToStravaStep1ClientMain
    implements UCMain<AuthenticateToStravaStep1Input>
{
    constructor(@inject('LinkManager') private linkManager: LinkManager) {}

    public async exec({
        uc,
    }: UCMainInput<AuthenticateToStravaStep1Input>): Promise<void> {
        const clientId = uc.reqVal0<ExternalServiceId>('clientId');
        const redirectURI = uc.reqVal0<URLString>('redirectURI');

        // Register the application
        // https://www.strava.com/settings/api
        // https://developers.strava.com/docs/authentication
        const url = new URL('https://www.strava.com/oauth/authorize');
        url.searchParams.append('approval_prompt', 'auto');
        url.searchParams.append('client_id', clientId);
        url.searchParams.append('redirect_uri', redirectURI);
        url.searchParams.append('response_type', 'code');
        url.searchParams.append('scope', 'activity:read_all');

        await this.linkManager.open(url.toString() as URLString, {
            withinContext: true,
        });
    }
}

export const AuthenticateToStravaStep1UCD: UCDef<AuthenticateToStravaStep1Input> =
    {
        io: {
            i: {
                fields: {
                    clientId: {
                        type: new TExternalServiceId().setExamples(['12345']),
                    },
                    redirectURI: {
                        fillingMode: UCInputFieldFillingMode.AUTO_PRE,
                        type: new TURL(),
                    },
                },
            },
        },
        lifecycle: {
            client: {
                main: AuthenticateToStravaStep1ClientMain,
                policy: EverybodyUCPolicy,
            },
        },
        metadata: Manifest.ucReg.AuthenticateToStravaStep1,
    };
