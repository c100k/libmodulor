import { inject, injectable } from 'inversify';

import type {
    ClockManager,
    EmailBuilder,
    EmailBuilderInput,
    EmailBuilderOutput,
    EmailVars,
    UUID,
} from '../../../../../../dist/esm/index.js';
import type { AlbumName } from '../TAlbumName.js';

interface Vars extends EmailVars {
    id: UUID;
    name: AlbumName;
}

@injectable()
export class NotifyAlbumCreationEmailBuilder implements EmailBuilder<Vars> {
    // We inject something to make sure it's not serialized in the snapshot
    constructor(@inject('ClockManager') private clockManager: ClockManager) {}

    public async exec({
        vars: { id, name },
    }: EmailBuilderInput<Vars>): Promise<EmailBuilderOutput> {
        const now = this.clockManager.now();

        return {
            content: {
                html: `<p>Hello,</p>

<p>A new album has been created : ${name} (${id}).</p>

<p>Best,</p>

<em>Notification generated at : ${now}</em>
`,
                text: `Hello,

A new album has been created : ${name} (${id}).

Best,

Notification generated at : ${now}`,
            },
            subject: '🎶 New Album Created !',
        };
    }
}
