import { injectable } from 'inversify';

import type { CreateActivityInput } from '../ucds/CreateActivityUCD.js';
import type { ActivityProcessor } from './ActivityProcessor.js';

@injectable()
export class FakeActivityProcessor implements ActivityProcessor {
    public entries: CreateActivityInput[] = [];

    public async dispatch(input: CreateActivityInput): Promise<void> {
        this.entries.push(input);
    }
}
