import { join } from 'node:path';

/**
 * @type {import('next').NextConfig}
 */
export default {
    poweredByHeader: false,

    /**
     * @see https://github.com/vercel/next.js/issues/53944
     * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/serverExternalPackages
     *
     * > Dependencies used inside Server Components and Route Handlers will automatically be bundled by Next.js.
     *
     * If we don't include it, we get a "Module not found: Can't resolve 'oracledb'" error.
     */
    serverExternalPackages: ['knex'],

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
