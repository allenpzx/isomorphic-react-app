const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');

const commonConfig = {
    mode: 'development',
    // watch: true,
    devtool: 'inline-source-map',
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
                    presets: ["@babel/preset-env", "@babel/preset-react", ],
                    plugins: [
                        "@babel/plugin-syntax-dynamic-import",
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        ["@babel/plugin-proposal-class-properties", { "loose": true }],
                        ["babel-plugin-import", { "libraryName": "antd" }]
                    ]
                  }
                }
            },
            {sideEffects: false} //for tree-shaking
        ]
    }
}

const clientConfig = {
    target: 'web',
    entry: {
        client: ["@babel/polyfill", path.resolve(__dirname, '../client/index.js')]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new ManifestPlugin({
            fileName: 'client.manifest.json'
        })
    ],
    ...commonConfig
}

const serverConfig = {
    target: 'node',
    entry: {
        server: ['@babel/polyfill', path.resolve(__dirname, '../server/index.js')]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new ManifestPlugin({
            fileName: 'server.manifest.json'
        })
    ],
    ...commonConfig
}

module.exports = [clientConfig, serverConfig];