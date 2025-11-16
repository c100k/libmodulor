import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
    test: {
        coverage: {
            exclude: ['src/apps/**/test', 'src/**/*.test.ts'],
            include: ['src'],
            reporter: ['html', 'lcov', 'text'],
            reportOnFailure: false,
        },
        env: loadEnv(mode, process.cwd(), ''),
        exclude: ['**/node_modules/**', '**/dist/**', '**/dist-examples/**'],
        reporters: ['verbose'],
    },
}));
