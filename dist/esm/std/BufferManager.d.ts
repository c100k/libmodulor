export type BufferManagerBase64String = string;
/**
 * The `Buffer` api is available in Node and similar server side environments. But it's not in browsers.
 *
 * Hence the need for this interface to provide multiple implementations (e.g. using https://github.com/feross/buffer).
 *
 * But the problem is that both implementations are redundant.
 *
 * TODO : Consider alternatives to BufferManager
 *
 * Possible solutions :
 *
 *   - Import the buffer lib as a polyfill
 *   - Use only ECMAScript compatible primitives (`ArrayBuffer`, `Uint8Array`, `DataView`, etc.)
 *   - Use BinaryJS
 *   - Use Fast-Buffer
 *
 * Note that for the last two, keeping this interface makes actually sense since other impl. not `Buffer`-like can be used.
 */
export interface BufferManager {
    decodeBase64<T extends string>(value: BufferManagerBase64String): T;
    decodeUint8Array<T extends string>(value: Uint8Array): T;
    encodeBase64<T extends string>(value: T): BufferManagerBase64String;
    encodeUint8Array<T extends string>(value: T): Uint8Array;
    from<T extends string>(value: T): Buffer;
    fromHexToBase64<T extends string>(value: T): BufferManagerBase64String;
}
