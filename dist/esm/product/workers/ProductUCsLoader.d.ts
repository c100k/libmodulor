import { AppUCsLoader, type AppUCsLoaderInput, type AppUCsLoaderOutput } from '../../app/index.js';
import type { FSManager, Worker } from '../../std/index.js';
import type { ProductManifest } from '../manifest.js';
export type Input = Pick<AppUCsLoaderInput, 'appsRootPath' | 'srcImporter'> & {
    from?: 'target' | undefined;
};
export type Output = AppUCsLoaderOutput;
export declare class ProductUCsLoader implements Worker<Input, Promise<Output>> {
    private appUCsLoader;
    private fsManager;
    private productManifest;
    constructor(appUCsLoader: AppUCsLoader, fsManager: FSManager, productManifest: ProductManifest);
    exec({ appsRootPath, from, srcImporter, }: Input): Promise<Output>;
}
