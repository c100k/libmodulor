import { existsSync } from 'node:fs';
import { cp, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

import { defineConfig, type PluginOption } from 'vite';

import { StripUCDLifecycleServerPlugin } from '../../../../dist/esm/index.vite.js';

const projectRoot = process.cwd();
const productPath = join('products', 'Playground');
const root = join('examples', productPath, 'spa');
const distPathRoot = join(projectRoot, 'dist-examples');
const distPath = existsSync(join(distPathRoot, 'examples'))
    ? join(distPathRoot, 'examples', productPath)
    : join(distPathRoot, productPath);
const serverTargetsNames = ['server-node-express', 'server-node-hono'] as const;
const outDirs = serverTargetsNames.map((n) => join(distPath, n, 'public'));
const [outDir, ...otherOutDirs] =
    outDirs as unknown as typeof serverTargetsNames;

const CopyBuildToOtherServersPlugin: PluginOption = {
    closeBundle: async () => {
        for await (const path of otherOutDirs) {
            await mkdir(path, { recursive: true });
            await cp(outDir, path, { recursive: true });
        }
    },
    name: 'copy-build-to-other-servers',
};

export default defineConfig({
    build: {
        // Because of this warning : `outDir ./dist/vite/spa is not inside project root and will not be emptied.`
        emptyOutDir: true,
        // Because we want the React tree to be "inspectable" with the React dev tools
        minify: false,
        outDir,
    },
    plugins: [StripUCDLifecycleServerPlugin, CopyBuildToOtherServersPlugin],
    root,
    server: {
        open: true,
    },
});
