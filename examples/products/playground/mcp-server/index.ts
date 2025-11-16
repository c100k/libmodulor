import {
    APPS_ROOT_DIR_NAME,
    type FSManager,
} from '../../../../dist/esm/index.js';
import { MCPServerBooter } from '../../../../dist/esm/index.node-mcp.js';
import container from './container.js';

await container.get(MCPServerBooter).exec({
    appsRootPath: container
        .get<FSManager>('FSManager')
        .path('..', '..', '..', APPS_ROOT_DIR_NAME),
    srcImporter: (path) => import(path),
});
