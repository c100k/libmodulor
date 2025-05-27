import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            enabled: true,
            exclude: ['src/apps/**/test', 'src/**/*.test.ts', 'src/**/.next'],
            include: ['src'],
            reporter: ['html', 'lcov', 'text'],
        },
        reporters: ['verbose'],
    },
});
