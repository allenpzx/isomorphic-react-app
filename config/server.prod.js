const path = require('path');
const NODE_ENV = process.env.NODE_ENV;
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    entry: {
        server: ["@babel/polyfill", path.resolve(__dirname, '../server/index.js')]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js'
    },
    target: 'node',
    mode: NODE_ENV,
    watch: false,
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
            fileName: 'server.manifest.json'
        })
    ],
    module: {
        rules: [
            {test: /\.css$/,use: ['style-loader','css-loader']},
            {test: /\.(png|svg|jpg|gif)$/,use: ['file-loader']},
            {test: /\.(woff|woff2|eot|ttf|otf)$/,use: ['file-loader']},
            {test: /\.(csv|tsv)$/,use: ['csv-loader']},
            {test: /\.xml$/,use: ['xml-loader']},
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-syntax-dynamic-import"]
                  }
                }
            },
            {sideEffects: false} //for tree-shaking
        ]
    }
}