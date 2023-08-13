const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',

    entry: {
        common: path.resolve(__dirname, 'src/js/common.js'),
        main: path.resolve(__dirname, 'src/js/main.js'),
        sub: path.resolve(__dirname, 'src/js/sub.js'),
    },

    output: {
        filename: '[name][contenthash].js',
        path: __dirname + '/public',
        clean: true,
        assetModuleFilename: '[name][ext]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            chunks: ['common','main'],
        }),
        new HtmlWebpackPlugin({
            filename: 'employee_write.html',
            template: 'src/employee_write.html',
            chunks: ['common','sub']
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css"
        }),
        ],

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|eot|woff|woff2)$/,
                type: 'asset/resource',
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
    devtool:"source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port:9000,
        open: true,
    }
}