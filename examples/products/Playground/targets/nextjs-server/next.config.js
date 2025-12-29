import { Plugin } from '../../../../../dist/esm/index.babel.js';
import { UC_DEF_SUFFIX } from '../../../../../dist/esm/index.js';

/**
 * @type {import('next').NextConfig}
 */
export default {
    poweredByHeader: false,

    /**
     * Prevent components from rendering twice in dev mode
     * @see https://stackoverflow.com/questions/71847778/why-is-my-nextjs-component-rendering-twice
     */
    reactStrictMode: false,

    /**
     * Prevent packaging dependencies creating errors like "Module not found: Can't resolve 'oracledb'"
     * @see https://github.com/vercel/next.js/issues/53944
     * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/serverExternalPackages
     */
    serverExternalPackages: ['knex'],

    webpack: (config, { isServer }) => {
        config.resolve.extensionAlias = {
            '.js': (config.resolve.extensionAlias ?? []).concat([
                '.js',
                '.jsx',
                '.ts',
                '.tsx',
            ]),
        };

        if (!isServer) {
            config.module.rules.push({
                exclude: /node_modules/,
                test: new RegExp(`${UC_DEF_SUFFIX}.js$`), // Files are already transpiled by the build.sh script
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [[Plugin]],
                    },
                },
            });
        }

        return config;
    },
};
