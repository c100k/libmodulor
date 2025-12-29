import { ServerBooter } from '../../../../../dist/esm/index.js';
import container from './container.js';

await container.get(ServerBooter).exec({
    srcImporter: (path) => import(path),
});
