import type { AppUCsLoaderInput } from '../../../app/index.js';
export type Input = Pick<AppUCsLoaderInput, 'appsRootPath' | 'srcImporter'>;
export type Output = void;
export interface CLIManager {
    handleCommand(input: Input): Promise<void>;
}
