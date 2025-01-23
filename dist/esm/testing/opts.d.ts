import type { FileName, FilePath } from '../dt/index.js';
import type { LoggerSettings } from '../std/index.js';
import type { RecursiveNonNullable } from '../utils/index.js';
import type { AppTesterCtx } from './ctx.js';
type AppTesterOptsAliasPrefix = string;
type AppTesterOptsImportsList = string[];
export interface AppTesterTypeScriptOpts {
    module?: string;
    moduleResolution?: string;
    noCheck?: boolean;
    skipLibCheck?: boolean;
    target?: string;
}
export type AppTesterOpts = Partial<Pick<LoggerSettings, 'logger_level'>> & {
    source?: {
        imports?: {
            external?: {
                aliasPrefix?: AppTesterOptsAliasPrefix;
                allowed?: AppTesterOptsImportsList;
            };
            internal?: {
                maxDepth?: FilePath;
                startChar?: string;
            };
        };
        ts?: {
            configFileName?: FileName;
        } & AppTesterTypeScriptOpts;
    };
};
export type AppTesterOptsAllSet = RecursiveNonNullable<AppTesterOpts>;
export declare const DEFAULT_APP_TESTER_OPTS: AppTesterOptsAllSet;
export declare function optsAllSet(opts: AppTesterCtx['opts']): AppTesterOptsAllSet;
export {};
