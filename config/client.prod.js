const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');
const common = require('./client.common.js');
const ManifestPlugin = require('webpack-manifest-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
        splitChunks: {
            chunks: "all", // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
            minSize: 30000, // 模块超过30k自动被抽离成公共模块
            minChunks: 1, // 模块被引用>=1次，便分割
            maxAsyncRequests: 5,  // 异步加载chunk的并发请求数量<=5
            maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
            name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
            automaticNameDelimiter: '~', // 命名分隔符
            cacheGroups: { // 缓存组，会继承和覆盖splitChunks的配置
                default: { // 模块缓存规则，设置为false，默认缓存组将禁用
                    minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
                    priority: -20, // 优先级
                    reuseExistingChunk: true, // 默认使用已有的模块
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/, // 表示默认拆分node_modules中的模块
                    priority: -10
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'bundle-analyze.html',
        }),
        new ManifestPlugin({
            fileName: 'client.manifest.json'
        })
    ]
});