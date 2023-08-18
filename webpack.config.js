const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); 
const dotenv = require("dotenv")

dotenv.config()

module.exports = {
  entry: {
    index: './JS/index.js', 
    profile: './JS/profile.js', 
  },
  output: {
    filename: '[name].bundle.js', // [name]은 entry의 키(index, profile)로 대체됨
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'profile.html',
      template: path.resolve(__dirname, 'profile.html'), 
    }),
    new webpack.DefinePlugin({ // 일단 post 에러 해결엔 도움 안됨
      'process.env.ACCESS_KEY': JSON.stringify(process.env.ACCESS_KEY),
      'process.env.SECRET_ACCESS_KEY': JSON.stringify(process.env.SECRET_ACCESS_KEY),
    })
  ],

  resolve: {
    // ...
    // add the fallback setting below 
    fallback: {
      "fs": false,
      "os": false,
      "path": false,
      "crypto": false
    },
  },
  mode: 'development'
};