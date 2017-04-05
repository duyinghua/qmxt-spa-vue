var path = require('path')
var ROOT = path.resolve(__dirname)
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractCSS = new ExtractTextPlugin('[name]_[hash].css')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
var CDN = process.env.CDN

module.exports = {
    entry: {
        'page1': ROOT + '/src/page1/page1',
        'page2': ROOT + '/src/page2/page2'
    },
    output: {
        filename: '[name]_[hash].js',
        path: ROOT + '/dist',
        publicPath: CDN ? CDN : '/dist'
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: extractCSS.extract('style', 'css')
            }
        ]
    },
    externals: {
        jQuery: 'window.jQuery'
    },
    resolve: {
        alias: {
            pages: ROOT + '/pages'
        }
    },
    plugins: [
        extractCSS,
        new webpack.DefinePlugin({
            'ENV': JSON.stringify(process.env.ENV)
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: ROOT + '/pages/html/page1.html',
            template: ROOT + '/src/page1/page1.html',
            chunks: ['common', 'page1']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: ROOT + '/pages/html/page2.html',
            template: ROOT + '/src/page2/page2.html',
            chunks: ['common', 'page2']
        }),
        new HtmlWebpackHarddiskPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        new webpack.ProvidePlugin({
            $: 'jQuery'
        })
    ]
}