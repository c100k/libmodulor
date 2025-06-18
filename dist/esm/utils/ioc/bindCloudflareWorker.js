import { NodeBufferManager } from '../../std/impl/NodeBufferManager.js';
import { NodeCryptoManager } from '../../std/impl/NodeCryptoManager.js';
import { NodeEnvironmentManager } from '../../std/impl/NodeEnvironmentManager.js';
import { WebFSManager } from '../../std/impl/WebFSManager.js';
export function bindCloudflareWorker(container) {
    // Reusing the Node.js implementations available with the `nodejs_compat` compatibility flag
    // https://developers.cloudflare.com/workers/runtime-apis/nodejs/#supported-nodejs-apis
    // std
    container.bind('BufferManager').to(NodeBufferManager);
    container.bind('CryptoManager').to(NodeCryptoManager);
    container
        .bind('EnvironmentManager')
        .to(NodeEnvironmentManager);
    container.bind('FSManager').to(WebFSManager);
}
