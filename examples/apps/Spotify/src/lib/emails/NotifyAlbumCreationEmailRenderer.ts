import { injectable } from 'inversify';

import type {
    EmailRenderer,
    EmailRendererInput,
    EmailRendererOutput,
    UUID,
} from '../../../../../../dist/esm/index.js';
import type { AlbumName } from '../TAlbumName.js';

interface Data {
    id: UUID;
    name: AlbumName;
}

@injectable()
export class NotifyAlbumCreationEmailRenderer implements EmailRenderer<Data> {
    public async exec({
        data,
    }: EmailRendererInput<Data>): Promise<EmailRendererOutput> {
        const { id, name } = data;

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
