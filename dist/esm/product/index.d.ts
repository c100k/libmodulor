export type { ProductI18n } from './i18n.js';
export type { ProductAppReg, ProductManifest, ProductName, ProductWording, } from './manifest.js';
export { ProductUCsLoader } from './workers/ProductUCsLoader.js';
export { type Input as SyncProductUCsLoaderInput, type Output as SyncProductUCsLoaderOutput, SyncProductUCsLoader, } from './workers/SyncProductUCsLoader.js';
