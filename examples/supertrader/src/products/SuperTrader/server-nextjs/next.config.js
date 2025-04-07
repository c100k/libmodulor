import { join } from 'node:path';

/**
 * @type {import('next').NextConfig}
 */
export default {
    poweredByHeader: false,
    typescript: {
        tsconfigPath: '../../../../tsconfig.json',
    },
    webpack: (config) => {
        config.resolve.extensionAlias = {
            '.js': (config.resolve.extensionAlias ?? []).concat([
                '.js',
                '.jsx',
                '.ts',
                '.tsx',
            ]),
        };

        return config;
    },
};
