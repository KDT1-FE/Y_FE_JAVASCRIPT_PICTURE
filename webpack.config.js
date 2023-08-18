const path = require('path');
var _ = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve('./public'),
        filename: '[name].js',
    },
    devServer: {

        port: 3033,
        proxy: {
            '/api/': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                secure: false,
            },
        },

        open: true,
        hot: true,
        historyApiFallback: true,
        static: {
            directory: path.resolve('./public'),
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: [/\.png$/, /\.jpg$/, /\.gif$/, /\.svg$/],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new CleanWebpackPlugin(),


        // loadash
        new LodashModuleReplacementPlugin(),

    ],
};
