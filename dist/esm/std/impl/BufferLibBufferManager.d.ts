import { Buffer } from 'buffer';
import type { BufferManager, BufferManagerBase64String } from '../BufferManager.js';
export declare class BufferLibBufferManager implements BufferManager {
    decodeBase64<T extends string>(value: BufferManagerBase64String): T;
    decodeUint8Array<T extends string>(value: Uint8Array): T;
    encodeBase64<T extends string>(value: T): BufferManagerBase64String;
    encodeUint8Array<T extends string>(value: T): Uint8Array;
    from<T extends string>(value: T): Buffer;
    fromHexToBase64<T extends string>(value: T): BufferManagerBase64String;
}
