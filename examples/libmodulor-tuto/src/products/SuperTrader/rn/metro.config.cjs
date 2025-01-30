const { join } = require('node:path');

// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.projectRoot = join(__dirname, '..', '..', '..', '..');

console.log('config.projectRoot', config.projectRoot);

config.resolver = {
    ...config.resolver,

    // See https://github.com/facebook/metro/issues/886#issuecomment-2232936049
    resolveRequest: (context, rawModuleName, platform) => {
        let moduleName = rawModuleName;

        const isPackage =
            !moduleName.startsWith('.') && !moduleName.startsWith('/');
        const isJsOrJsxFile =
            !isPackage &&
            (moduleName.endsWith('.js') || moduleName.endsWith('.jsx'));
        if (isJsOrJsxFile) moduleName = moduleName.replace(/\.[^/.]+$/, '');

        return context.resolveRequest(context, moduleName, platform);
    },

    // See https://github.com/facebook/metro/issues/1128 / https://metrobundler.dev/docs/configuration/#unstable_enablepackageexports-experimental
    unstable_enablePackageExports: true,
};

module.exports = config;
