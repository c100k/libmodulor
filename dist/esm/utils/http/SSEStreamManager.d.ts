import type { HTTPAPICallExecutorResBody, Worker } from '../../std/index.js';
type Encoding = 'utf-8';
interface I<D extends object = object> {
    encoding?: Encoding | undefined;
    onData: (data: D) => Promise<void>;
    reader: ReturnType<HTTPAPICallExecutorResBody['getReader']>;
}
export declare class SSEStreamManager implements Worker<I, Promise<void>> {
    private static DEFAULT_ENCODING;
    exec({ encoding, onData, reader, }: I): Promise<void>;
}
export {};
