const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');
const common = require('./client.common.js');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //         cacheGroups: {
    //             vendor: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendors',
    //                 chunks: 'all'
    //             }
    //         }
    //     },
    //     runtimeChunk: 'single'
    // },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'bundle-analyze.html',
        }),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new ManifestPlugin({
            fileName: 'client.manifest.json'
        })
    ]
});