import type { ProcessOutputEmitter } from '../ProcessOutputEmitter.js';
export declare class NodeProcessOutputEmitter implements ProcessOutputEmitter {
    emitErr(msg: string): Promise<void>;
    emitRes(msg: string): Promise<void>;
}
