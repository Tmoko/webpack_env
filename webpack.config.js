const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const globule = require('globule');
const { resolve } = require('path');


let rules = [
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
    },
    {
        test: /\.html$/,
        use: {
            loader: 'html-loader',
        }
    }
]


const build = {
    mode: "development",
    devServer: {
        static: "dist",
        open: true
    },
    resolve: {
        extensions: ['.js', '.json', '.scss', '.css'],
        alias: {
            '~': path.resolve(__dirname, 'src'),
        },
        roots: [path.resolve(__dirname, "src")],
    },
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './js/main.js'
    },
    module: {
        rules: rules,
    },
    // ES5(IE11等)向けの指定
    target: ['web', 'es5'],
    plugins:[
        new MiniCssExtractPlugin({
            filename: './css/main.css',
        }),
        // new HtmlWebpackPlugin({
        //     template: './src/templates/index.html'
        // }),
        new CleanWebpackPlugin()
    ]
}

const htmlFiles = globule.find('src/templates/**/*.html');

htmlFiles.forEach((htmlFile) => {
    const htmlname = htmlFile.split('/').slice(-1)[0];

    build.plugins.push(
        new HtmlWebpackPlugin({
            filename: `${path.resolve(__dirname, './dist')}/${htmlname}`,
            // inject: 'body',
            template: htmlFile,
            minify: false
        })
    )
});

module.exports = build;
