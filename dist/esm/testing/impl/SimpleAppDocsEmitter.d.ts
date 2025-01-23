import type { FSManager } from '../../std/index.js';
import type { AppDocsEmitter, Input, Output } from '../workers/AppDocsEmitter.js';
export declare class SimpleAppDocsEmitter implements AppDocsEmitter {
    private fsManager;
    constructor(fsManager: FSManager);
    exec({ appPath, ucDefSourcesCheckerOutput, }: Input): Promise<Output>;
}
