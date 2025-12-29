import type { JWT } from '../../../../../../../dist/esm/index.js';

export interface AuthDataStore {
    get(): Promise<JWT | null>;
    set(jwt: JWT | null): Promise<void>;
}
