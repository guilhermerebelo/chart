var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './test/app/app.js',
    output: {
        filename: 'pes-componente-modelo.js'
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
        new HtmlWebpackPlugin({
            template: './test/content/index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin({
            filename: 'componente-modelo.css',
            allChunks: true
        })
    ],
    externals: {
        angular: 'angular',
        billboard: 'billboard.js'
    },
    devtool: '#source-map',
    devServer: {
        contentBase: './test/content',
        stats: 'minimal',
        open: true
    }
};
