import type { UIntQuantity, UUID } from '../../dt/index.js';
import type { CryptoManagerRandomString } from '../CryptoManager.js';
import { NodeCryptoManager } from './NodeCryptoManager.js';
/**
 * A deterministic {@link CryptoManager} based on {@link NodeCryptoManager}
 *
 * The main purpose is to have an implementation that generates always the
 * same data deterministically to make snapshot assertions in tests easier.
 *
 * WARNING : it keeps internal "seeds" to generate always the same data.
 *
 * In our case, it's an auto-incremented integer.
 *
 * So if the same implementation is used in multiple places
 * (e.g. in concurrent tests within the same test suite),
 * be ready for "race conditions" and inconsistencies.
 */
export declare class NodeDeterministicCryptoManager extends NodeCryptoManager {
    private randomStringIdx;
    private uuidIdx;
    clear(): Promise<void>;
    randomString(length: UIntQuantity): Promise<CryptoManagerRandomString>;
    randomUUID(): UUID;
}
