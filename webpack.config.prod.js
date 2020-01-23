const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    mode: 'production',
    devtool: 'none',

    context: __dirname + '/src',
    entry: ['./main.js'],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.[contenthash].js'
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.ejs'),
        })
    ],

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
}