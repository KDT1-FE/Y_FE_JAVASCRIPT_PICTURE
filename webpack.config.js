const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { resolve, join } = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    publicPath: "/",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: join(__dirname, "dist"),
    },
    compress: true,
    port: 5500,
    open: {
      app: {
        name: "google chrome",
      },
    },
  },
  module: {
    rules: [
      // 이미지 로더
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        type: "asset/resource",
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new NodePolyfillPlugin(),
    new Dotenv(),
  ],
};
