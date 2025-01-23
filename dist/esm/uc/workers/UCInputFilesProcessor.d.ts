import type { ClockManager, Configurable, CryptoManager, FSManager, SettingsManager, Worker } from '../../std/index.js';
import type { UC } from '../UC.js';
import type { UCInput } from '../input.js';
import type { UCOPIBase } from '../opi.js';
import type { UCSettings } from '../settings.js';
interface Input<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    uc: UC<I, OPI0, OPI1>;
}
type S = Pick<UCSettings, 'uc_file_ref_prefix' | 'uc_files_directory_path'>;
export declare class UCInputFilesProcessor implements Configurable<S>, Worker<Input, Promise<void>> {
    private clockManager;
    private cryptoManager;
    private fsManager;
    private settingsManager;
    constructor(clockManager: ClockManager, cryptoManager: CryptoManager, fsManager: FSManager, settingsManager: SettingsManager<S>);
    s(): S;
    exec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ uc }: Input<I, OPI0, OPI1>): Promise<void>;
    private processFile;
}
export {};
