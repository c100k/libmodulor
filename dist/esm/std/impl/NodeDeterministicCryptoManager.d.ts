import type { UIntQuantity, UUID } from '../../dt/index.js';
import type { CryptoManagerRandomString } from '../CryptoManager.js';
import { NodeCryptoManager } from './NodeCryptoManager.js';
export declare class NodeDeterministicCryptoManager extends NodeCryptoManager {
    private randomStringIdx;
    private uuidIdx;
    clear(): Promise<void>;
    randomString(length: UIntQuantity): Promise<CryptoManagerRandomString>;
    randomUUID(): UUID;
}
