const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    target: 'web',
    entry: {
        client: ["@babel/polyfill", path.resolve(__dirname, '../client/index.js')]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, '../dist')]),
        new HtmlWebpackPlugin({
            title: 'Isomorphic React App',
            template: path.resolve(__dirname, '../public/index.html'),
            minify: true
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
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
                    },
                    {
                        loader: 'sass-loader', 
                        options: {
                            includePaths: [path.resolve(__dirname, '../client')]
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
                include: [path.resolve(__dirname, '../client')],
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