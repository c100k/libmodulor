import { NodeStricliCLIManager } from '../../../../dist/esm/index.node-stricli-cli.js';
import container from './container.js';

await container.get(NodeStricliCLIManager).handleCommand({
    srcImporter: (path) => import(path),
});
