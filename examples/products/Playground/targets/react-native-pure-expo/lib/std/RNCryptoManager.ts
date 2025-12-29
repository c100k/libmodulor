import { injectable } from 'inversify';

import {
    type BufferManagerBase64String,
    type CryptoManager,
    type CryptoManagerBinaryToTextEncoding,
    type CryptoManagerHash,
    type CryptoManagerHashAlgorithm,
    type CryptoManagerHMACKey,
    type CryptoManagerHMACKeyEncoding,
    type CryptoManagerRandomString,
    type CryptoManagerSalt,
    type CryptoManagerSaltedScrypt,
    NotImplementedError,
    type Password,
    type UIntQuantity,
    type UUID,
} from '../../../../../../../dist/esm/index.js';

@injectable()
export class RNCryptoManager implements CryptoManager {
    public async clear(): Promise<void> {
        throw new NotImplementedError<this>('clear');
    }

    public hash(
        _algorithm: CryptoManagerHashAlgorithm,
        _base: string,
        _binaryToTextEncoding: CryptoManagerBinaryToTextEncoding,
    ): CryptoManagerHash {
        throw new NotImplementedError<this>('hash');
    }

    public hmacToBase64(
        _algorithm: CryptoManagerHashAlgorithm,
        _base: string,
        _key: CryptoManagerHMACKey,
        _keyEncoding: CryptoManagerHMACKeyEncoding,
    ): BufferManagerBase64String {
        throw new NotImplementedError<this>('hmacToBase64');
    }

    public hmacToHex(
        _algorithm: CryptoManagerHashAlgorithm,
        _base: string,
        _key: CryptoManagerHash,
        _keyEncoding: CryptoManagerHMACKeyEncoding,
    ): CryptoManagerHash {
        throw new NotImplementedError<this>('hmacToHex');
    }

    public async pbkdf2(
        _password: Password,
        _salt: CryptoManagerSalt,
        _iterationsCount: UIntQuantity,
        _keyLength: UIntQuantity,
        _digest: CryptoManagerHashAlgorithm,
    ): Promise<Uint8Array> {
        throw new NotImplementedError<this>('pbkdf2');
    }

    public async randomString(
        _length: UIntQuantity,
    ): Promise<CryptoManagerRandomString> {
        throw new NotImplementedError<this>('randomString');
    }

    public randomUUID(): UUID {
        throw new NotImplementedError<this>('randomUUID');
    }

    public async scrypt(
        _password: Password,
        _salt: CryptoManagerSalt,
        _keyLength: UIntQuantity,
    ): Promise<CryptoManagerSaltedScrypt> {
        throw new NotImplementedError<this>('scrypt');
    }
}
