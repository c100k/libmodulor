import type { Password, UIntQuantity, UUID } from '../dt/index.js';
import type { Clearable } from '../utils/index.js';
import type { BufferManagerBase64String } from './BufferManager.js';
export type CryptoManagerBinaryToTextEncoding = 'hex';
export type CryptoManagerHash = string;
export type CryptoManagerHashAlgorithm = 'sha1' | 'sha256' | 'sha512';
export type CryptoManagerHMACKey = string;
export type CryptoManagerHMACKeyEncoding = 'hex' | 'utf-8';
export type CryptoManagerRandomString = string;
export type CryptoManagerSalt = string;
export type CryptoManagerSaltedScrypt = string;
export interface CryptoManager extends Clearable {
    hash(algorithm: CryptoManagerHashAlgorithm, base: string, binaryToTextEncoding: CryptoManagerBinaryToTextEncoding): CryptoManagerHash;
    hmacToBase64(algorithm: CryptoManagerHashAlgorithm, base: string, key: CryptoManagerHMACKey, keyEncoding: CryptoManagerHMACKeyEncoding): BufferManagerBase64String;
    hmacToHex(algorithm: CryptoManagerHashAlgorithm, base: string, key: CryptoManagerHash, keyEncoding: CryptoManagerHMACKeyEncoding): CryptoManagerHash;
    pbkdf2(password: Password, salt: CryptoManagerSalt, iterationsCount: UIntQuantity, keyLength: UIntQuantity, digest: CryptoManagerHashAlgorithm): Promise<Uint8Array>;
    randomString(length: UIntQuantity): Promise<CryptoManagerRandomString>;
    randomUUID(): UUID;
    scrypt(password: Password, salt: CryptoManagerSalt, keyLength: UIntQuantity): Promise<CryptoManagerSaltedScrypt>;
}
