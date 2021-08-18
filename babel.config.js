module.exports = function babel(api) {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage',
          corejs: 2,
        },
      ],
      '@babel/preset-react',
    ],
    env: {
      development: {
        plugins: [],
      },
      production: {
        sourceMaps: true,
      },
    },
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-json-strings',
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      '@babel/plugin-proposal-function-sent',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-throw-expressions',
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 2,
        },
      ],
    ],
  };
};
