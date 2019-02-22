const path = require('path');
const NODE_ENV = process.env.NODE_ENV;
const ManifestPlugin = require('webpack-manifest-plugin');

const commonConfig = {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ManifestPlugin({
            fileName: '[name].manifest.json'
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'bundle-analyze.html',
        }),
        new UglifyJSPlugin({
            sourceMap: true
        }),
    ],
    watch: false,
    devtool: 'source-map',
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

const clientConfig = {
    target: 'web',
    entry: {
        client: ["@babel/polyfill", path.resolve(__dirname, '../client/index.js')]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js'
    },
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
    ...commonConfig
}

module.exports = [clientConfig, serverConfig];