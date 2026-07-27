import { injectable } from 'inversify';

import type {
    EmailBuilder,
    EmailBuilderInput,
    EmailBuilderOutput,
    UUID,
} from '../../../../../../dist/esm/index.js';
import type { AlbumName } from '../TAlbumName.js';

interface Input extends EmailBuilderInput {
    id: UUID;
    name: AlbumName;
}

@injectable()
export class NotifyAlbumCreationEmailBuilder implements EmailBuilder<Input> {
    public async exec({ id, name }: Input): Promise<EmailBuilderOutput> {
        return {
            html: `<p>Hello,</p>
<p>A new album has been created : ${name} (${id}).</p>
<p>Best,</p>
`,
            subject: '🎶 New Album Created !',
            text: `Hello,
A new album has been created : ${name} (${id}).
Best,
`,
        };
    }
}
