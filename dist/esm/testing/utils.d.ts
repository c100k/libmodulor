import type { FilePath, UIntDuration } from '../dt/index.js';
export type TestData<I, O> = {
    i: I;
    o: O;
}[];
export declare function awaitForSrcImport(path: FilePath, timeoutInMs?: UIntDuration): Promise<void>;
