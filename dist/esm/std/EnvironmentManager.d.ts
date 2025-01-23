import type { FilePath } from '../dt/index.js';
export type EnvironmentManagerEnvVarName = string;
type Browser = 'chrome' | 'edge' | 'firefox' | 'opera' | 'safari';
type MobileOS = 'android' | 'ios';
type OS = 'darwin' | 'linux' | 'macos' | 'windows' | 'windows_nt';
export type EnvironmentManagerType = Browser | MobileOS | OS | (string & {});
export interface EnvironmentManager {
    cwd(): FilePath;
    env(name: EnvironmentManagerEnvVarName): string | undefined;
    home(): FilePath;
    isProd(): boolean;
    type(): EnvironmentManagerType;
}
export {};
