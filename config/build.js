/* eslint-env node */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'pes-componente-modelo': './src/index.js'
    },
    output: {
        path: __dirname + '/../dist',
        filename: 'pes-componente-modelo.js',
        library: 'pesComponenteModelo',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            }
        ]
    },
    plugins: [
        // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
        // Only emit files when there are no errors
        new webpack.NoEmitOnErrorsPlugin(),

        // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
        // Minify all javascript, switch loaders to minimizing mode
        //new webpack.optimize.UglifyJsPlugin(),

        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files
        // Disabled when in test mode or not in build mode
        new ExtractTextPlugin({
            filename: 'componente-modelo.css',
            allChunks: true
        })
    ],
    externals: {
        angular: 'angular',
        moment: 'moment',
        lodash: '_'
    },
    devtool: '#source-map'
};
