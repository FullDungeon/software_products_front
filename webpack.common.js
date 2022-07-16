const path = require('path')
const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

CATALOG_SRC = path.resolve(__dirname, 'src')
CATALOG_DIST = path.resolve(__dirname, 'dist')

module.exports = {
    entry: path.resolve(CATALOG_SRC, "index.js"),
    output: {
        path: CATALOG_DIST,
        filename: 'bundle.js',
    },
    performance: { hints: false },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Development",
            template: path.resolve(CATALOG_SRC, 'index.html'),
            inject: 'body',
            minify: false
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(CATALOG_DIST, 'products.index.html'),
            template: path.resolve(CATALOG_SRC, 'products.index.html'),
            inject: 'body',
            minify: false
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(CATALOG_DIST, 'products.show.html'),
            template: path.resolve(CATALOG_SRC, 'products.show.html'),
            inject: 'body',
            minify: false
        }),new HtmlWebpackPlugin({
            filename: path.resolve(CATALOG_DIST, 'products.edit.html'),
            template: path.resolve(CATALOG_SRC, 'products.edit.html'),
            inject: 'body',
            minify: false
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(CATALOG_DIST, 'auth.index.html'),
            template: path.resolve(CATALOG_SRC, 'auth.index.html'),
            inject: 'body',
            minify: false
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(CATALOG_DIST, '403.html'),
            template: path.resolve(CATALOG_SRC, '403.html'),
            inject: 'body',
            minify: false
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(CATALOG_DIST, '404.html'),
            template: path.resolve(CATALOG_SRC, '404.html'),
            inject: 'body',
            minify: false
        }),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "sass-loader"
                    }
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            },
            {
                test: /\.ttf$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            }
        ],
    },
};