/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common.js');

const rootDir = path.resolve(__dirname, '../../');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  devServer: {
    compress: true,
    port: 8079,
    host: '0.0.0.0',
    hot: true,
    contentBase: path.resolve(rootDir, 'public'),
    disableHostCheck: true,
    writeToDisk: true,
  },
});
