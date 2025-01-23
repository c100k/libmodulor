import type { FilePath } from '../../dt/index.js';
import type { Worker } from '../../std/index.js';
import type { Output as UCDefSourcesCheckerOutput } from './checkers/UCDefSourcesChecker.js';
export interface Input {
    appPath: FilePath;
    ucDefSourcesCheckerOutput: UCDefSourcesCheckerOutput;
}
export interface Output {
    outPath: FilePath;
}
export interface AppDocsEmitter extends Worker<Input, Promise<Output>> {
}
