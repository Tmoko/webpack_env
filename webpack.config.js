const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './js/main.js'
    },
    module: {
        rules: [
            {
                test: /\.css/, //.cssを検知する
                //実行順は下から上
                 use: [
                     {
                        loader: MiniCssExtractPlugin.loader
                     },
                     {
                         loader: 'css-loader'
                     }
                 ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: './css/main.css',
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/index.html'
        }),
        new CleanWebpackPlugin()
    ]
}
