import type { CryptoManager, Worker } from '../../std/index.js';
import { UCBuilder, type UCInput, type UCManager, type UCOPIBase } from '../../uc/index.js';
import type { AppTesterExecInput, AppTesterExecOutput } from '../exec.js';
type Input<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = AppTesterExecInput<I, OPI0, OPI1>;
interface Output<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    out: AppTesterExecOutput<I, OPI0, OPI1>;
}
export declare class UCExecutor implements Worker<Input, Promise<Output>> {
    private cryptoManager;
    private ucBuilder;
    private ucManager;
    private static HASH_ALG;
    private static HASH_BTT_ENCODING;
    private static HASH_SEP;
    constructor(cryptoManager: CryptoManager, ucBuilder: UCBuilder, ucManager: UCManager);
    exec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ appManifest, auth, authName, inputFiller, inputFillerName, ucd, }: Input<I, OPI0, OPI1>): Promise<Output<I, OPI0, OPI1>>;
    overrideUCManager(ucManager: UCManager): void;
    private execClient;
    private derandomizeInput;
    private derandomizeInputFile;
    private determineStatus;
}
export {};
