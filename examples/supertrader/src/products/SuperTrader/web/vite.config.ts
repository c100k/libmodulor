import { cp, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import { StripUCDLifecycleServerPlugin } from 'libmodulor/vite';
import { type PluginOption, defineConfig } from 'vite';

const projectRoot = process.cwd();
const targetsPath = join('src', 'products', 'SuperTrader');
const root = join(targetsPath, 'web');

const serverTargetsName = ['server-node-express', 'server-node-hono'] as const;
const distTargetsPath = join(projectRoot, 'dist', 'products', 'SuperTrader');
const outDirs = serverTargetsName.map((n) =>
    join(distTargetsPath, n, 'public'),
);
const [outDir, ...otherOutDirs] =
    outDirs as unknown as typeof serverTargetsName;

const CopyBuildToOtherServersPlugin: PluginOption = {
    name: 'copy-build-to-other-servers',
    closeBundle: async () => {
        for await (const path of otherOutDirs) {
            await mkdir(path, { recursive: true });
            await cp(outDir, path, { recursive: true });
        }
    },
};

export default defineConfig({
    build: {
        emptyOutDir: true,
        outDir,
    },
    plugins: [
        StripUCDLifecycleServerPlugin,
        tailwindcss(),
        CopyBuildToOtherServersPlugin,
    ],
    root,
});
