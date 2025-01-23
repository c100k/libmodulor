import type { UCDataStore } from '../../uc/index.js';
import type { ExternalResourceManager } from '../ExternalResourceManager.js';
export declare class UCDataStoreExternalResourceManager implements ExternalResourceManager {
    private ucDataStore;
    constructor(ucDataStore: UCDataStore);
    create(): Promise<void>;
    delete(): Promise<void>;
    exists(): Promise<boolean>;
    name(): string;
}
