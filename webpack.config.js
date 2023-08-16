const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mode: 'development',

  entry: {
    common: path.resolve(__dirname, 'src/js/common.js'),
    main: path.resolve(__dirname, 'src/js/main.js'),
    sub: path.resolve(__dirname, 'src/js/sub.js'),
    login: path.resolve(__dirname, 'src/js/login.js'),
    dashboard: path.resolve(__dirname, 'src/js/dashboard.js'),
    join: path.resolve(__dirname, 'src/js/join.js'),
    basic: ['./src/css/reset.css', './src/css/basic.css'],
    styles: ['./src/scss/style.scss', './src/scss/variable.scss'],
  },

  output: {
    filename: 'js/[name]-[contenthash].js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
    assetModuleFilename: 'asset/[name][ext]',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ['common', 'dashboard'],
      scriptLoading: 'blocking',
    }),
    new HtmlWebpackPlugin({
      filename: 'employee_list.html',
      template: 'src/employee_list.html',
      chunks: ['common', 'main'],
      scriptLoading: 'blocking',
    }),
    new HtmlWebpackPlugin({
      filename: 'employee_write.html',
      template: 'src/employee_write.html',
      chunks: ['common', 'sub'],
      scriptLoading: 'blocking',
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: 'src/login.html',
      chunks: ['login'],
      scriptLoading: 'blocking',
    }),
    new HtmlWebpackPlugin({
      filename: 'join.html',
      template: 'src/join.html',
      chunks: ['join'],
      scriptLoading: 'blocking',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        exclude: /src\/scss/,
        type: 'asset/resource',
        generator: {
          filename: 'asset/[name][ext]',
        },
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(eot|woff|woff2)$/,
        type: 'asset/resource',
      },

      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    open: true,
  },
};
