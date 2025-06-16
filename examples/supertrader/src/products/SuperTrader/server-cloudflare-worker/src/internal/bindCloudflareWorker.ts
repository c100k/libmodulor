import type { Container } from 'inversify';
import type {
    BufferManager,
    CryptoManager,
    EnvironmentManager,
    FSManager,
} from 'libmodulor';
import {
    NodeBufferManager,
    NodeCryptoManager,
    NodeEnvironmentManager,
} from 'libmodulor/node';

import { CloudflareWorkerFSManager } from './CloudflareWorkerFSManager.js';

export function bindCloudflareWorker(container: Container): void {
    // Reusing the Node.js implementations available with the `nodejs_compat` compatibility flag
    // https://developers.cloudflare.com/workers/runtime-apis/nodejs/#supported-nodejs-apis

    // std
    container.bind<BufferManager>('BufferManager').to(NodeBufferManager);
    container.bind<CryptoManager>('CryptoManager').to(NodeCryptoManager);
    container
        .bind<EnvironmentManager>('EnvironmentManager')
        .to(NodeEnvironmentManager);
    container.bind<FSManager>('FSManager').to(CloudflareWorkerFSManager);
}
