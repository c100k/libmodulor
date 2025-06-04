import type { Password, UIntQuantity, UUID } from '../../dt/index.js';
import type { BufferManagerBase64String } from '../BufferManager.js';
import type { CryptoManager, CryptoManagerHash, CryptoManagerHashAlgorithm, CryptoManagerHMACKey, CryptoManagerHMACKeyEncoding, CryptoManagerRandomString, CryptoManagerSalt, CryptoManagerSaltedScrypt } from '../CryptoManager.js';
export declare class WebCryptoManager implements CryptoManager {
    clear(): Promise<void>;
    hash(_algorithm: CryptoManagerHashAlgorithm, _base: string): CryptoManagerHash;
    hmacToBase64(_algorithm: CryptoManagerHashAlgorithm, _base: string, _key: CryptoManagerHMACKey, _keyEncoding: CryptoManagerHMACKeyEncoding): BufferManagerBase64String;
    hmacToHex(_algorithm: CryptoManagerHashAlgorithm, _base: string, _key: CryptoManagerHMACKey, _keyEncoding: CryptoManagerHMACKeyEncoding): CryptoManagerHash;
    pbkdf2(password: Password, salt: CryptoManagerSalt, iterationsCount: UIntQuantity, keyLength: UIntQuantity, digest: CryptoManagerHashAlgorithm): Promise<Uint8Array>;
    randomString(length: UIntQuantity): Promise<CryptoManagerRandomString>;
    randomUUID(): UUID;
    scrypt(): Promise<CryptoManagerSaltedScrypt>;
}
