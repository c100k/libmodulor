import {
    type AppManifest,
    type Logger,
    type ServerManager,
    UCBuilder,
    type UCDef,
    UCExecMode,
    ucHTTPContract,
} from 'libmodulor';

import {
    BuyAssetUCD,
    CancelOrderUCD,
    ListOrdersUCD,
    Manifest,
} from '../../../../apps/Trading/index.js';
import container from './container.js';
import type { CloudflareWorkerHonoServerManager } from './internal/CloudflareWorkerHonoServerManager.js';

// Unlike other server implementations, we cannot load the UCs via the `await import()` syntax since Workers do not support top-level await
// biome-ignore lint/suspicious/noExplicitAny: can be anything
const apps = new Map<AppManifest, UCDef<any, any, any>[]>([
    [Manifest, [BuyAssetUCD, CancelOrderUCD, ListOrdersUCD]],
]);

const logger = container.get<Logger>('Logger');
const ucBuilder = container.get(UCBuilder);

const serverManager = container.get<ServerManager>(
    'ServerManager',
) as CloudflareWorkerHonoServerManager;
serverManager.initSync();
for (const [appManifest, ucds] of apps.entries()) {
    for (const ucd of ucds) {
        // TODO : Make ServerBooter logic reusable

        const uc = ucBuilder.exec({ appManifest, auth: null, def: ucd });
        const {
            lifecycle: { server },
            sec,
        } = uc.def;

        const contract = ucHTTPContract(uc);
        const { mountingPoint } = contract;

        if (typeof server !== 'object' || server.execMode === UCExecMode.AUTO) {
            logger.debug(`Not mounting ${mountingPoint}`, {
                reason:
                    typeof server !== 'object'
                        ? 'no ucd.lifecycle.server'
                        : 'execMode is AUTO',
            });
            continue;
        }

        logger.info(`Mounting ${mountingPoint}`, {
            contract,
            sec,
        });

        serverManager.mountSync(uc.appManifest, uc.def, contract);
    }
}
// eslint-disable-next-line no-console
// biome-ignore lint/suspicious/noConsole: we want it
console.log(serverManager.getRuntime());

export default serverManager.getRuntime();
