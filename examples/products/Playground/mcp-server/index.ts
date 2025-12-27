import { MCPServerBooter } from '../../../../dist/esm/index.node-mcp.js';
import container from './container.js';

await container.get(MCPServerBooter).exec({
    srcImporter: (path) => import(path),
});
