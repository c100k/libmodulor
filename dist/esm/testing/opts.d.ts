import type { FileName, FilePath } from '../dt/index.js';
import type { LoggerSettings } from '../std/index.js';
import type { RecursiveNonNullable } from '../utils/index.js';
import type { AppTesterCtx } from './ctx.js';
type AppTesterOptsAliasPrefix = string;
type AppTesterOptsImportsList = string[];
export interface AppTesterTypeScriptOpts {
    /**
     * Although the TS lib relies on an enum (`ModuleKind`), we use plain text so it's compatible with a regular tsconfig.json
     * @see https://www.typescriptlang.org/tsconfig/#module
     * @defaultValue "NodeNext"
     */
    module?: string;
    /**
     * Although the TS lib relies on an enum (`ModuleResolutionKind`), we use plain text so it's compatible with a regular tsconfig.json
     * @see https://www.typescriptlang.org/tsconfig/#moduleResolution
     * @defaultValue "NodeNext"
     */
    moduleResolution?: string;
    /**
     * @see https://www.typescriptlang.org/tsconfig/#noCheck
     * @defaultValue true
     */
    noCheck?: boolean;
    /**
     * @see https://www.typescriptlang.org/tsconfig/#skipLibCheck
     * @defaultValue true
     */
    skipLibCheck?: boolean;
    /**
     * Although the TS lib relies on an enum (`ScriptTarget`), we use plain text so it's compatible with a regular tsconfig.json
     * @see https://www.typescriptlang.org/tsconfig/#target
     * @defaultValue "ESNext"
     */
    target?: string;
}
export type AppTesterOpts = Partial<Pick<LoggerSettings, 'logger_level'>> & {
    source?: {
        imports?: {
            external?: {
                /**
                 * @defaultValue '@'
                 */
                aliasPrefix?: AppTesterOptsAliasPrefix;
                /**
                 * @defaultValue ['libmodulor', 'inversify']
                 */
                allowed?: AppTesterOptsImportsList;
            };
            internal?: {
                /**
                 * @defaultValue '../../'
                 */
                maxDepth?: FilePath;
                /**
                 * @defaultValue '.'
                 */
                startChar?: string;
            };
        };
        ts?: {
            /**
             * @defaultValue tsconfig.json
             */
            configFileName?: FileName;
        } & AppTesterTypeScriptOpts;
    };
};
export type AppTesterOptsAllSet = RecursiveNonNullable<AppTesterOpts>;
export declare const DEFAULT_APP_TESTER_OPTS: AppTesterOptsAllSet;
export declare function optsAllSet(opts: AppTesterCtx['opts']): AppTesterOptsAllSet;
export {};
