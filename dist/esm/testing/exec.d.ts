import type { AppManifest } from '../app/index.js';
import type { ErrorMessage, SemanticsVariant } from '../dt/index.js';
import type { CryptoManagerHash } from '../std/index.js';
import type { UCAuth, UCDef, UCInput, UCOPIBase, UCOutput } from '../uc/index.js';
import type { ExtractStrict } from '../utils/index.js';
import type { AppTesterConfiguratorSideEffects } from './AppTesterConfigurator.js';
import type { UCAuthSetterName } from './uc-auth.js';
import type { UCInputFiller, UCInputFillerName } from './uc-input.js';
export type AppTesterExecName = string;
export type AppTesterExecStatus = ExtractStrict<SemanticsVariant, 'danger' | 'success' | 'warning'>;
export interface AppTesterExecArgs<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    auth: UCAuth | null;
    authName: UCAuthSetterName;
    inputFiller: UCInputFiller<I, OPI0, OPI1>;
    inputFillerName: UCInputFillerName;
}
export type AppTesterExecInput<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = AppTesterExecArgs<I, OPI0, OPI1> & {
    appManifest: AppManifest;
    ucd: UCDef<I, OPI0, OPI1>;
};
export interface AppTesterExecOutput<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    args: AppTesterExecArgs<I, OPI0, OPI1>;
    err: Error | null;
    hash: CryptoManagerHash | null;
    io: {
        i: I | null;
        o: UCOutput<OPI0, OPI1> | null;
    };
    sideEffects: AppTesterConfiguratorSideEffects | null;
    status: AppTesterExecStatus;
}
export type AppTesterExecOutputSerialized<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = Omit<AppTesterExecOutput<I, OPI0, OPI1>, 'err'> & {
    err: {
        message?: ErrorMessage;
        name: 'CustomError' | 'Error' | 'TypeError' | (string & {});
    } | null;
};
export interface AppTesterExec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    name: AppTesterExecName;
    out: AppTesterExecOutput<I, OPI0, OPI1>;
}
export type AnyAppTesterExec = AppTesterExec<any, any, any>;
