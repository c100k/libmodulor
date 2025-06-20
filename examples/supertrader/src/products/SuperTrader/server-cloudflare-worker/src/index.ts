import {
    type AppManifest,
    type ServerManager,
    SyncEdgeWorkerInitializer,
    SyncProductUCsLoader,
    type SyncProductUCsLoaderInput,
    type UCDef,
} from 'libmodulor';
import type { SyncEdgeWorkerHonoServerManager } from 'libmodulor/cloudflare-worker-hono';

import {
    BuyAssetUCD,
    CancelOrderUCD,
    ListOrdersUCD,
    Manifest,
} from '../../../../apps/Trading/index.js';
import container from './container.js';

const productLoader = container.get(SyncProductUCsLoader);
const serverManager = container.get<ServerManager>(
    'ServerManager',
) as SyncEdgeWorkerHonoServerManager;

const defs: SyncProductUCsLoaderInput['defs'] = new Map<
    AppManifest,
    // biome-ignore lint/suspicious/noExplicitAny: can be anything
    UCDef<any, any, any>[]
>([[Manifest, [BuyAssetUCD, CancelOrderUCD, ListOrdersUCD]]]);
const ucs = productLoader.exec({ defs });

container.get(SyncEdgeWorkerInitializer).exec({
    ucs,
});

export default (serverManager as SyncEdgeWorkerHonoServerManager).getRuntime();
