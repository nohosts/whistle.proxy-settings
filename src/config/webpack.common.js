const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { whistleConfig: { serverName, defaultNohostAddress } } = require('../../package.json');

const rootDir = path.resolve(__dirname, '../../');
const srcDir = path.resolve(rootDir, 'src');

module.exports = {
  entry: {
    index: path.resolve(srcDir, 'pages/index/index'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(rootDir, 'public'),
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.jsx', 'json'],
    mainFields: ['jsnext:main', 'browser', 'main'],
    symlinks: true,
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  devtool: 'none',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      template: path.resolve(srcDir, 'html/index.html'),
    }),
  ],
};