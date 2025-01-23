import type { FilePath } from '../../dt/index.js';
import type { EnvironmentManager, EnvironmentManagerEnvVarName, EnvironmentManagerType } from '../EnvironmentManager.js';
export declare class NodeEnvironmentManager implements EnvironmentManager {
    cwd(): FilePath;
    env(name: EnvironmentManagerEnvVarName): string | undefined;
    home(): FilePath;
    isProd(): boolean;
    type(): EnvironmentManagerType;
}
