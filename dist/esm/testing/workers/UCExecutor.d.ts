import type { AppManifest } from '../../app/index.js';
import type { ErrorMessage } from '../../dt/index.js';
import type { CryptoManager, CryptoManagerHash, Worker } from '../../std/index.js';
import { type UCAuth, UCBuilder, type UCDef, type UCInput, type UCManager, type UCOPIBase, type UCOutput } from '../../uc/index.js';
import type { UCAuthSetterName } from '../uc-auth.js';
import type { UCInputFiller, UCInputFillerName } from '../uc-input.js';
export type UCExecutorAssertion<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = (exec: UCExecutorExecOutput<I, OPI0, OPI1>) => boolean;
export interface UCExecutorExecOutput<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    args: Pick<Input<I, OPI0, OPI1>, 'auth' | 'authName' | 'inputFiller' | 'inputFillerName'>;
    err: Error | null;
    hash: CryptoManagerHash | null;
    io: {
        i: I | null;
        o: UCOutput<OPI0, OPI1> | null;
    };
}
export type UCExecutorExecOutputSerialized<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = Omit<UCExecutorExecOutput<I, OPI0, OPI1>, 'err'> & {
    err: {
        message?: ErrorMessage;
        name: 'CustomError' | 'Error' | 'TypeError' | (string & {});
    } | null;
};
export interface Input<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    appManifest: AppManifest;
    auth: UCAuth | null;
    authName: UCAuthSetterName;
    inputFiller: UCInputFiller<I, OPI0, OPI1>;
    inputFillerName: UCInputFillerName;
    ucd: UCDef<I, OPI0, OPI1>;
}
export interface Output<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    out: UCExecutorExecOutput<I, OPI0, OPI1>;
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
}
