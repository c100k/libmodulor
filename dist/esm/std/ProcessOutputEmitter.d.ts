export interface ProcessOutputEmitter {
    emitErr(msg: string): Promise<void>;
    emitRes(msg: string): Promise<void>;
}
