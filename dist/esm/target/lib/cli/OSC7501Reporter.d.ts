import type { ProductManifest } from '../../../product/index.js';
import type { BufferManager, ProcessOutputEmitter, Worker } from '../../../std/index.js';
import { type OSC7501Input } from '../../../utils/index.js';
type Input = OSC7501Input;
export declare class OSC7501Reporter implements Worker<Input, Promise<void>> {
    private bufferManager;
    private processOutputEmitter;
    private productManifest;
    constructor(bufferManager: BufferManager, processOutputEmitter: ProcessOutputEmitter, productManifest: ProductManifest);
    exec(input: Input): Promise<void>;
    private buildVars;
}
export {};
