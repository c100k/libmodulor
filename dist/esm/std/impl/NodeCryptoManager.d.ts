import type { Password, UIntQuantity, UUID } from '../../dt/index.js';
import type { BufferManagerBase64String } from '../BufferManager.js';
import type { CryptoManager, CryptoManagerBinaryToTextEncoding, CryptoManagerHash, CryptoManagerHashAlgorithm, CryptoManagerHMACKey, CryptoManagerHMACKeyEncoding, CryptoManagerRandomString, CryptoManagerSalt, CryptoManagerSaltedScrypt } from '../CryptoManager.js';
export declare class NodeCryptoManager implements CryptoManager {
    clear(): Promise<void>;
    hash(algorithm: CryptoManagerHashAlgorithm, base: string, binaryToTextEncoding: CryptoManagerBinaryToTextEncoding): CryptoManagerHash;
    hmacToBase64(algorithm: CryptoManagerHashAlgorithm, base: string, key: CryptoManagerHMACKey, keyEncoding: CryptoManagerHMACKeyEncoding): BufferManagerBase64String;
    hmacToHex(algorithm: CryptoManagerHashAlgorithm, base: string, key: CryptoManagerHMACKey, keyEncoding: CryptoManagerHMACKeyEncoding): CryptoManagerHash;
    pbkdf2(password: Password, salt: CryptoManagerSalt, iterationsCount: UIntQuantity, keyLength: UIntQuantity, digest: CryptoManagerHashAlgorithm): Promise<Uint8Array>;
    randomString(length: UIntQuantity): Promise<CryptoManagerRandomString>;
    randomUUID(): UUID;
    scrypt(password: Password, salt: CryptoManagerSalt, keyLength: UIntQuantity): Promise<CryptoManagerSaltedScrypt>;
}
