const { Plugin } = require('./babel.config.esm-bridge.js').default;

module.exports = (api) => {
    api.cache(true);
    return {
        plugins: ['babel-plugin-transform-typescript-metadata', [Plugin]],
        presets: ['babel-preset-expo'],
    };
};
