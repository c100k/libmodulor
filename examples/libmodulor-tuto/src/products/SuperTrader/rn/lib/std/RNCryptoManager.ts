import { injectable } from 'inversify';
import type {
    BufferManagerBase64String,
    CryptoManager,
    CryptoManagerBinaryToTextEncoding,
    CryptoManagerHMACKey,
    CryptoManagerHMACKeyEncoding,
    CryptoManagerHash,
    CryptoManagerHashAlgorithm,
    CryptoManagerRandomString,
    CryptoManagerSalt,
    CryptoManagerSaltedScrypt,
    Password,
    UIntQuantity,
    UUID,
} from 'libmodulor';

// TODO : Implement RNCryptoManager
// Of course, it works without it for now, but when we enable authentication and/or client-side only UCs it will need at least `randomUUID()`
@injectable()
export class RNCryptoManager implements CryptoManager {
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

    public pbkdf2(
        _password: Password,
        _salt: CryptoManagerSalt,
        _iterationsCount: UIntQuantity,
        _keyLength: UIntQuantity,
        _digest: CryptoManagerHashAlgorithm,
    ): Promise<Uint8Array> {
        throw new Error('Method not implemented.');
    }

    public randomString(
        _length: UIntQuantity,
    ): Promise<CryptoManagerRandomString> {
        throw new Error('Method not implemented.');
    }

    public randomUUID(): UUID {
        throw new Error('Method not implemented.');
    }

    public scrypt(
        _password: Password,
        _salt: CryptoManagerSalt,
        _keyLength: UIntQuantity,
    ): Promise<CryptoManagerSaltedScrypt> {
        throw new Error('Method not implemented.');
    }

    public clear(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
