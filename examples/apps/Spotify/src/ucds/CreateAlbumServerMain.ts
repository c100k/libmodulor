import { inject, injectable } from 'inversify';

import {
    type LLMManager,
    type Logger,
    type UCMain,
    type UCMainInput,
    type UCManager,
    type UCOutput,
    UCOutputBuilder,
} from '../../../../../dist/esm/index.js';
import type { CreateAlbumInput, CreateAlbumOPI0 } from './CreateAlbumUCD.js';

@injectable()
export class CreateAlbumServerMain
    implements UCMain<CreateAlbumInput, CreateAlbumOPI0>
{
    constructor(
        @inject('LLMManager') private llmManager: LLMManager,
        @inject('Logger') private logger: Logger,
        @inject('UCManager') private ucManager: UCManager,
    ) {}

    public async exec({
        uc,
    }: UCMainInput<CreateAlbumInput, CreateAlbumOPI0>): Promise<
        UCOutput<CreateAlbumOPI0>
    > {
        let artist = uc.rVal0('artist');
        const description = uc.rVal0('description');
        const isPrivate = uc.rVal0('isPrivate');
        const language = uc.rVal0('language');
        const name = uc.reqVal0('name');
        const releaseYear = uc.rVal0('releaseYear');
        const tags = uc.rValArr('tags');

        // >=> Log if the album is private
        if (isPrivate) {
            this.logger.debug('Creating private album');
        }

        // >=> Fetch the artist via an LLM
        if (!artist) {
            const { choices } = await this.llmManager.send({
                messages: [
                    {
                        // DO NOT USE THIS IN PRODUCTION (PROMPT-INJECTION)
                        content: `Return the artist of the album named "${name}". Don't do any formatting, simply return the name so I can use it directly`,
                        role: 'user',
                    },
                ],
                model: 'mistral-large-latest',
            });
            artist = choices[0]?.message?.content ?? null;
            uc.inputField('artist').setVal(artist);
        }

        // >=> Persist the album
        const { aggregateId } = await this.ucManager.persist(uc);

        return new UCOutputBuilder<CreateAlbumOPI0>()
            .add({
                artist,
                description,
                id: aggregateId,
                isPrivate,
                language,
                name,
                releaseYear,
                tags,
            })
            .get();
    }
}
