const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        // filename: 'index.js' filenameを変えるとき
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
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ]
}
