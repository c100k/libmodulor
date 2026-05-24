import type { ProductUCsLoaderOutput } from '../../../../product/index.js';
import type { Worker } from '../../../../std/index.js';
import type { UCManager } from '../../../../uc/index.js';
export interface MCPHTTPRequestHandlerBuilderInput {
    ucs: ProductUCsLoaderOutput;
    /**
     * It is not injected in the handler constructor because it must be the same as the one used in ServerManager.
     *
     * And in some cases, this latter is specific to a context : for instance in automated tests.
     */
    ucManager: UCManager;
}
export interface MCPHTTPRequestHandlerBuilder<H extends Function> extends Worker<MCPHTTPRequestHandlerBuilderInput, H> {
}
