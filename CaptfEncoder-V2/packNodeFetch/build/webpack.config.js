const path = require('path');
const webpack = require('webpack');

const baseConfig = require('./webpack.base.config')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    ...baseConfig,

    entry: ['./src/index.js'],
    output: {
        filename: process.env.NODE_ENV === 'production'
        ? 'index.min.js'
        : 'index.js',
        libraryTarget: 'commonjs2',
        path: process.env.NODE_ENV === 'production'
            ? path.resolve(__dirname, '../release/')
            : path.resolve(__dirname, '../release/')
    },
    externals: {
        encoding: 'encoding',       
    },
    target: "node",
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    resolve: {
        alias: {
            '@': resolve('src'),
        },
        extensions: ['.js', '.json', '.css', '.node', ".ts"]
    },
    plugins: [

    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')],
                exclude: /node_modules/,
            }
        ]
    },



};