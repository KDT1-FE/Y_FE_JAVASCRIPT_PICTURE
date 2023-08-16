'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const autoprefixer = require('autoprefixer');
const { resolve, join } = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/public/js/app.js',
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
    compress: true,
    port: 5500,
    open: {
      app: {
        name: 'google chrome',
      },
    },
  },
  module: {
    rules: [
      {
        // Adds CSS to the DOM by injecting a `<style>` tag
        loader: 'style-loader',
      },
      {
        // 이미지 로더
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        type: 'asset/resource',
      },
      // 웹폰트 로더
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   type: "asset/resource",
      //   generator: {
      //     filename: "src/fonts/[name].[hash:8].[ext]",
      //   },
      // },
      {
        // SASS 로더
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/main/index.html',
      filename: 'main.[contenthash].html',
      chunks: ['main'],
      showErrors: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new NodePolyfillPlugin(),
    new Dotenv(),
  ],
};
