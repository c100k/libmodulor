import { injectable } from 'inversify';
import type {
    BufferManagerBase64String,
    CryptoManager,
    CryptoManagerBinaryToTextEncoding,
    CryptoManagerHash,
    CryptoManagerHashAlgorithm,
    CryptoManagerHMACKey,
    CryptoManagerHMACKeyEncoding,
    CryptoManagerRandomString,
    CryptoManagerSalt,
    CryptoManagerSaltedScrypt,
    Password,
    UIntQuantity,
    UUID,
} from 'libmodulor';

// TODO : Implement RNCryptoManager

@injectable()
export class RNCryptoManager implements CryptoManager {
    public async clear(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public hash(
        _algorithm: CryptoManagerHashAlgorithm,
        _base: string,
        _binaryToTextEncoding: CryptoManagerBinaryToTextEncoding,
    ): CryptoManagerHash {
        throw new Error('Method not implemented.');
    }

    public hmacToBase64(
        _algorithm: CryptoManagerHashAlgorithm,
        _base: string,
        _key: CryptoManagerHMACKey,
        _keyEncoding: CryptoManagerHMACKeyEncoding,
    ): BufferManagerBase64String {
        throw new Error('Method not implemented.');
    }

    public hmacToHex(
        _algorithm: CryptoManagerHashAlgorithm,
        _base: string,
        _key: CryptoManagerHash,
        _keyEncoding: CryptoManagerHMACKeyEncoding,
    ): CryptoManagerHash {
        throw new Error('Method not implemented.');
    }

    public async pbkdf2(
        _password: Password,
        _salt: CryptoManagerSalt,
        _iterationsCount: UIntQuantity,
        _keyLength: UIntQuantity,
        _digest: CryptoManagerHashAlgorithm,
    ): Promise<Uint8Array> {
        throw new Error('Method not implemented.');
    }

    public async randomString(
        _length: UIntQuantity,
    ): Promise<CryptoManagerRandomString> {
        throw new Error('Method not implemented.');
    }

    public randomUUID(): UUID {
        throw new Error('Method not implemented.');
    }

    public async scrypt(
        _password: Password,
        _salt: CryptoManagerSalt,
        _keyLength: UIntQuantity,
    ): Promise<CryptoManagerSaltedScrypt> {
        throw new Error('Method not implemented.');
    }
}
