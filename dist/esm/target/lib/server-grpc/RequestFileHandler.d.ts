import type { File } from '../../../dt/index.js';
import type { ClockManager, Configurable, CryptoManager, FSManager, SettingsManager, Worker } from '../../../std/index.js';
import type { ServerManagerSettings } from '../server/ServerManager.js';
interface Input {
    buffer: Buffer;
}
interface Output {
    file: File;
}
type S = Pick<ServerManagerSettings, 'server_tmp_path'>;
export declare class RequestFileHandler implements Configurable<S>, Worker<Input, Promise<Output>> {
    private clockManager;
    private cryptoManager;
    private fsManager;
    private settingsManager;
    constructor(clockManager: ClockManager, cryptoManager: CryptoManager, fsManager: FSManager, settingsManager: SettingsManager<S>);
    s(): S;
    exec({ buffer }: Input): Promise<Output>;
}
export {};
