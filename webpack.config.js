'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const autoprefixer = require('autoprefixer')

const { resolve, join } = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/public/js/app.js',
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: join(__dirname, 'dist'),
    },
    historyApiFallback: {
      index: 'index.html', // 인덱스 HTML로 리다이렉트
    },
    compress: true,
    hot: true,
    port: 1008,
  },
  module: {
    rules: [
      // 이미지 로더
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      // 웹폰트 로더
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   type: "asset/resource",
      //   generator: {
      //     filename: "src/fonts/[name].[hash:8].[ext]",
      //   },
      // },
      // SASS 로더
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
            },
          },
          'css-loader',
          'sass-loader',
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new NodePolyfillPlugin(),
    new Dotenv(),
  ],
}
