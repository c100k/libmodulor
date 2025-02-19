import type { FilePath } from '../dt/index.js';
export type EnvironmentManagerEnvVarName = string;
type Browser = 'chrome' | 'edge' | 'firefox' | 'opera' | 'safari';
type MobileOS = 'android' | 'ios';
type OS = 'darwin' | 'linux' | 'macos' | 'windows' | 'windows_nt';
/**
 * The type of environment
 *
 * The goal of this is not to give the final platform where the runtime is executed.
 * For instance, in the context of a browser, we want to know that it's running on 'firefox' and not 'macos'.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform
 * @see https://reactnative.dev/docs/platform#os
 * @see https://nodejs.org/api/os.html#ostype
 */
export type EnvironmentManagerType = Browser | MobileOS | OS | (string & {});
export interface EnvironmentManager {
    cwd(): FilePath;
    env(name: EnvironmentManagerEnvVarName): string | undefined;
    home(): FilePath;
    isProd(): boolean;
    type(): EnvironmentManagerType;
}
export {};
