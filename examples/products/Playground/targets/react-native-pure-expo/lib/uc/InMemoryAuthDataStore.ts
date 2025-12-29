import { injectable } from 'inversify';

import type { JWT } from '../../../../../../../dist/esm/index.js';
import type { AuthDataStore } from './AuthDataStore.js';

@injectable()
export class InMemoryAuthDataStore implements AuthDataStore {
    private jwt: JWT | null = null;

    public async get(): Promise<JWT | null> {
        return this.jwt;
    }

    public async set(jwt: JWT | null): Promise<void> {
        this.jwt = jwt;
    }
}
