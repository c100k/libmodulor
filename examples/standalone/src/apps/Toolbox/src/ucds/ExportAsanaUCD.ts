import { inject, injectable } from 'inversify';
import {
    type ErrorMessage,
    EverybodyUCPolicy,
    type ExternalServiceId,
    type FreeTextLong,
    type FSManager,
    type HTTPAPICaller,
    type JWT,
    type Logger,
    type Password,
    TExternalServiceId,
    TPassword,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCMain,
    type UCMainInput,
    type UIntQuantity,
    type URL,
    type URLPath,
} from 'libmodulor';

import { Manifest } from '../manifest.js';

export interface ExportAsanaInput extends UCInput {
    accessToken: UCInputFieldValue<Password>;
    projectId: UCInputFieldValue<ExternalServiceId>;
}

@injectable()
class ExportAsanaClientMain implements UCMain<ExportAsanaInput> {
    constructor(
        @inject('FSManager') private fsManager: FSManager,
        @inject('HTTPAPICaller') private httpAPICaller: HTTPAPICaller,
        @inject('Logger') private logger: Logger,
    ) {}

    public async exec({ uc }: UCMainInput<ExportAsanaInput>): Promise<void> {
        const accessToken = uc.reqVal0<Password>('accessToken');
        const projectId = uc.reqVal0<ExternalServiceId>('projectId');

        type Req = {
            limit: UIntQuantity;
            offset?: JWT;
            opt_expand: '(this|subtasks%2B)';
        };
        type ResBad = {
            errors: [
                {
                    help: FreeTextLong;
                    message: ErrorMessage;
                },
            ];
        };
        type ResGood = {
            data: unknown[];
            next_page: {
                offset: JWT;
                path: URLPath;
                uri: URL;
            } | null;
        };
        const responses: ResGood[] = [];
        let response: ResGood | null = null;
        do {
            this.logger.debug('Fetching', { iteration: responses.length });

            response = await this.httpAPICaller.exec<
                undefined,
                Req,
                ResBad,
                ResGood,
                ResGood
            >({
                authorizationHeader: {
                    prefix: 'Bearer',
                    value: accessToken,
                },
                errBuilder: async (error) => {
                    // TODO : Make src/std/impl/FakeHTTPAPICallExecutor.ts more flexible to return errors given a URL pattern
                    // Workaround to make tests pass since it's not something I use in production. But that needs to be improved
                    if (
                        'message' in error &&
                        typeof error.message === 'string'
                    ) {
                        return error.message;
                    }

                    return error.errors.map((err) => err.message).join(' AND ');
                },
                method: 'GET',
                req: {
                    builder: async () => {
                        const base: Req = {
                            limit: 100,
                            opt_expand: '(this|subtasks%2B)',
                        };
                        const offset = response?.next_page?.offset;
                        if (offset) {
                            base.offset = offset;
                        }

                        return base;
                    },
                    envelope: 'query-params',
                },
                urlBuilder: async () =>
                    `https://app.asana.com/api/1.0/projects/${projectId}/tasks`,
            });

            this.logger.debug('Fetched items', {
                count: response.data.length,
            });

            responses.push(response);
        } while (response?.next_page);

        await this.fsManager.touch('data.json', JSON.stringify(responses));
    }
}

export const ExportAsanaUCD: UCDef<ExportAsanaInput> = {
    io: {
        i: {
            fields: {
                accessToken: {
                    type: new TPassword(),
                },
                projectId: {
                    type: new TExternalServiceId(),
                },
            },
        },
    },
    lifecycle: {
        client: {
            main: ExportAsanaClientMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.ExportAsana,
};
