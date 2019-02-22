const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./client.common.js');
const path = require('path');
module.exports = merge(common, {
    entry: {
        client:["@babel/polyfill", path.resolve(__dirname, '../client/index.js')]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].bundle.js',
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
});