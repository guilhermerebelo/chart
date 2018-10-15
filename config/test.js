module.exports = {
    externals: {
        angular: 'angular'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: [/node_modules/, /\.spec\.js$/],
                use: {
                    loader: 'istanbul-instrumenter-loader',
                    options: {
                        esModules: true
                    }
                }
            },
            {
                test: /\.css$/,
                use: 'css-loader'
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            }
        ]
    },
    devtool: '#inline-source-map'
};
