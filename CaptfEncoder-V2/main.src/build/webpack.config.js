const path = require('path');
const webpack = require('webpack');

const baseConfig = require('./webpack.base.config')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    ...baseConfig,

    entry: ['./src/main.js'],
    output: {
        filename: 'index.js',
        libraryTarget: 'commonjs2',
        path: process.env.NODE_ENV === 'production'
            ? path.resolve(__dirname, '../../prod/main')
            : path.resolve(__dirname, '../../dev/main')
    },
    target: "electron-main",
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