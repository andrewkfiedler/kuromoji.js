const path = require('path');

const serverConfig =  {
    entry: './src/kuromoji.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'kuromoji.node.js',
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test:  /\.(dat)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            mimetype: 'application/octet-stream'
                        },
                    }
                ]
            }
        ]
    }
};

const clientConfig = {
    entry: './src/kuromoji.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'kuromoji.js'
    },
    target: 'web',
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test:  /\.(dat)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            mimetype: 'application/octet-stream'
                        },
                    }
                ]
            }
        ]
    }
};

module.exports = [ serverConfig, clientConfig]