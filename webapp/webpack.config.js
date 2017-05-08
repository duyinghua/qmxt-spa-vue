var path = require('path')
var ROOT = path.resolve(__dirname)
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        publicPath: "./dist/",
        path: ROOT + '/dist',
        filename: '[name].js?[hash]'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // other vue-loader options go here
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css!px2rem?remUnit=75&remPrecision=8'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    externals: {
        Zepto: 'window.Zepto'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new HtmlWebpackHarddiskPlugin(),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: ROOT + '/index.html',
            template: ROOT + '/tpl/index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'Zepto'
        })
    ],
    devServer: {
        historyApiFallback: true,
        inline: true,
        port: 9090
    },
    performance: {
        hints: false
    },
    devtool: 'source-map'
}
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
