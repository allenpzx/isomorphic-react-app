const path = require('path');
const webpack = require('webpack');
// const devMode = process.env.NODE_ENV !== 'production';
const common = require('./client.common.js');

// common.target = 'node';
common.mode = 'development'
common.entry.client.pop();
common.entry.client.push(path.resolve(__dirname, '../client/app.js'));
common.plugins = common.plugins.concat([
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
]);
common.devtool = 'inline-source-map',
common.devServer = {
    contentBase: path.resolve(__dirname, '../dist'),
    historyApiFallback: true,
    publicPath: '/'
}
module.exports = common;