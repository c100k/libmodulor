import { join } from 'node:path';

import { StripUCDLifecycleServerPlugin } from 'libmodulor/vite';
import { defineConfig } from 'vite';

const base = process.cwd();
const root = join('src', 'products', 'SuperTrader', 'web');
const outDir = join(
    base,
    'dist',
    'products',
    'SuperTrader',
    'server',
    'public',
);

export default defineConfig({
    build: {
        emptyOutDir: true,
        outDir,
    },
    plugins: [StripUCDLifecycleServerPlugin],
    root,
});
