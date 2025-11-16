import { inject, injectable } from 'inversify';

import {
    type BufferManager,
    type JWT,
    type JWTManager,
    type JWTManagerDecodeOpts,
    type JWTManagerEncodeOpts,
    NotImplementedError,
} from '../../../../../../dist/esm/index.js';

@injectable()
export class RNJWTManager implements JWTManager {
    constructor(
        @inject('BufferManager') private bufferManager: BufferManager,
    ) {}

    public async decode<T>(
        _value: JWT,
        _opts?: JWTManagerDecodeOpts,
    ): Promise<T> {
        throw new NotImplementedError<this>('decode');
    }

    public async decodeUnsafe<T>(value: JWT): Promise<T> {
        // DO NOT USE THIS IN PRODUCTION !!!
        const [_header, body] = value
            .split('.')
            .map((p) => this.bufferManager.decodeBase64(p));
        // biome-ignore lint/style/noNonNullAssertion: we want it
        return JSON.parse(body!) as T;
    }

    public async encode<T extends object>(
        _payload: T,
        _opts?: JWTManagerEncodeOpts,
    ): Promise<JWT> {
        throw new NotImplementedError<this>('encode');
    }

    public async isUsable(_value: JWT): Promise<boolean> {
        throw new NotImplementedError<this>('isUsable');
    }
}
