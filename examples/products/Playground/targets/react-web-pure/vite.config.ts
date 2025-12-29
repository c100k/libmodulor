import { existsSync } from 'node:fs';
import { cp, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

import { defineConfig, type PluginOption } from 'vite';

import {
    PRODUCT_TARGETS_DIR_NAME,
    PRODUCTS_ROOT_DIR_NAME,
    type TargetName,
} from '../../../../../dist/esm/index.js';
import { Plugin } from '../../../../../dist/esm/index.vite.js';

const projectRoot = process.cwd();
const productPath = join(PRODUCTS_ROOT_DIR_NAME, 'Playground');
const root = join(
    'examples',
    productPath,
    PRODUCT_TARGETS_DIR_NAME,
    'react-web-pure',
);
const distPathRoot = join(projectRoot, 'dist-examples');
const distPath = existsSync(join(distPathRoot, 'examples'))
    ? join(distPathRoot, 'examples', productPath)
    : join(distPathRoot, productPath);
const serverTargetsNames = [
    'node-express-server',
    'node-hono-server',
] satisfies TargetName[];
const outDirs = serverTargetsNames.map((targetName) =>
    join(distPath, PRODUCT_TARGETS_DIR_NAME, targetName, 'public'),
);
const [outDir, ...otherOutDirs] = outDirs;

const CopyBuildToOtherServersPlugin: PluginOption = {
    closeBundle: async () => {
        for await (const path of otherOutDirs) {
            await mkdir(path, { recursive: true });
            // biome-ignore lint/style/noNonNullAssertion: we want it
            await cp(outDir!, path, { recursive: true });
        }
    },
    name: 'copy-build-to-other-servers',
};

export default defineConfig({
    build: {
        // Because of this warning : `outDir [...] is not inside project root and will not be emptied.`
        emptyOutDir: true,
        // Because we want the React tree to be "inspectable" with the React dev tools
        minify: false,
        // biome-ignore lint/style/noNonNullAssertion: we want it
        outDir: outDir!,
    },
    plugins: [Plugin, CopyBuildToOtherServersPlugin],
    root,
    server: {
        open: true,
    },
});
