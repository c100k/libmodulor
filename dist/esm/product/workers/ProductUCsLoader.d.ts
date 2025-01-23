import { AppUCsLoader, type AppUCsLoaderInput, type AppUCsLoaderOutput } from '../../app/index.js';
import type { Worker } from '../../std/index.js';
import type { ProductManifest } from '../manifest.js';
type Input = Pick<AppUCsLoaderInput, 'appsRootPath' | 'srcImporter'>;
type Output = AppUCsLoaderOutput;
export declare class ProductUCsLoader implements Worker<Input, Promise<Output>> {
    private appUCsLoader;
    private productManifest;
    constructor(appUCsLoader: AppUCsLoader, productManifest: ProductManifest);
    exec({ appsRootPath, srcImporter }: Input): Promise<Output>;
}
export {};
