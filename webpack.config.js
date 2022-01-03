const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


const app = {
    mode: "development",
    devServer: {
        static: "dist",
        open: true
    },
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
            },
            {
                test: /\.(png|jpg)/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                },
                use:[
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         esModule: false,
                    //         name: 'images/[name].[ext]'
                    //     }
                    // }
                ]
            }
        ]
    },
    // ES5(IE11等)向けの指定
    target: ['web', 'es5'],
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

module.exports = app;
