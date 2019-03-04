const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV != 'production';

const commonConfig = {
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: "postcss",
                            plugins: () => [
                                require('precss')(),
                                require('autoprefixer')()
                            ]
                        }
                    }
                ],
            },  
            {test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']},
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/, 
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].bundle.[ext]',
                    }
                }
            },
            {test: /\.(csv|tsv)$/, use: ['csv-loader']},
            {test: /\.xml$/,use: ['xml-loader']},
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: [
                        "@babel/plugin-transform-regenerator",
                        "@babel/plugin-syntax-dynamic-import",
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        ["@babel/plugin-proposal-class-properties", { "loose": true }],
                        ["babel-plugin-import", { "libraryName": "antd" }]
                    ]
                  }
                }
            }
        ]
    }
}

const clientConfig = {
    mode: devMode ? 'development' : 'production',
    // target: 'web',
    entry: {
        client: ["@babel/polyfill", path.resolve(__dirname, '../client/index.js')]
    },
    ...commonConfig
}

const serverConfig = {
    mode: devMode ? 'development' : 'production',
    target: 'node',
    entry: {
        server: ["@babel/polyfill", path.resolve(__dirname, '../server/index.js')]
    },
    ...commonConfig
}

module.exports = [clientConfig, serverConfig];