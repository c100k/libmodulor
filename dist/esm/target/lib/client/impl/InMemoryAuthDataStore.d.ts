import type { JWT } from '../../../../dt/index.js';
import type { AuthDataStore } from '../AuthDataStore.js';
export declare class InMemoryAuthDataStore implements AuthDataStore {
    private jwt;
    get(): Promise<JWT | null>;
    set(jwt: JWT | null): Promise<void>;
}
