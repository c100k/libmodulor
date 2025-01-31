module.exports = (api) => {
    api.cache(true);
    return {
        plugins: [
            'babel-plugin-transform-typescript-metadata',
            ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
            '@babel/plugin-transform-flow-strip-types',
            '@babel/plugin-transform-class-static-block',
            ['@babel/plugin-transform-class-properties', { loose: true }],
            'babel-plugin-parameter-decorator',
        ],
        presets: ['babel-preset-expo'],
    };
};
