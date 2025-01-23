import type { Container } from 'inversify';
import type { AppI18n, AppManifest } from '../app/index.js';
import type { FileName, FilePath } from '../dt/index.js';
import type { UCDefSource, UCName } from '../uc/index.js';
import type { AppTesterOpts } from './opts.js';
export interface AppTesterUCDRef {
    fileName: FileName;
    name: UCName;
    source: UCDefSource;
}
export interface AppTesterCtx {
    appI18n: AppI18n;
    appManifest: AppManifest;
    appPath: FilePath;
    container: Container;
    opts: AppTesterOpts | undefined;
    ucdRefs: AppTesterUCDRef[];
}
