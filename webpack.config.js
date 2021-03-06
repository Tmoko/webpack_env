const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const globule = require('globule');

const MODE = "development";
const enabledSourceMap = MODE === "development";

let rules = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    presets:[
                        '@babel/preset-env',
                    ],
                }
            }
        ]
    },
    {
        test: /\.(css|sass|scss)/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader
            },
            {
                loader: 'css-loader'
            },
            {
                loader: 'sass-loader',
                options: {
                    implementation: require('sass'),
                    sassOptions: {
                        fiber: false
                    },
                    sourceMap: enabledSourceMap
                }
            }
        ]
    },
    {
        test: /\.(png|jpe?g|gif|svg)$/i,
        generator: {
            filename: 'images/[name]-[contenthash][ext]'
        },
        type: 'asset/resource',
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
    },
    {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
            }
          }
        ]
    }
]


const build = {
    devtool: 'source-map',
    mode: MODE,
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
            watch: true
          },
          liveReload: true,
          open: true,
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
        filename: './js/[name]-[contenthash].js',
        publicPath: '/'
    },
    module: {
        rules: rules,
    },
    // ES5(IE11???)???????????????
    target: ['web', 'es5'],
    plugins:[
        new MiniCssExtractPlugin({
            filename: './css/[name]-[contenthash].css',
        }),
        new ImageMinimizerPlugin({
            minimizer: {
              implementation: ImageMinimizerPlugin.squooshMinify,
              options: {
                encodeOptions: {
                    //https://github.com/GoogleChromeLabs/squoosh/blob/dev/libsquoosh/src/codecs.ts
                  mozjpeg: {
                    quality: 75,
                  },
                  oxipng: {
                    // level: 2,
                  },
                  webp: {
                    lossless: 1,
                  },
                  avif: {
                    cqLevel: 0,
                  },
                },
              },
            },
          }),
        new CleanWebpackPlugin()
    ],
    stats: {
        children: true,
      },
}

// const htmlFiles = globule.find('src/templates/**/*.html');

// htmlFiles.forEach((htmlFile) => {
//     const htmlname = htmlFile.split('/').slice(-1)[0];

//     build.plugins.push(
//         new HtmlWebpackPlugin({
//             filename: `${path.resolve(__dirname, './dist')}/${htmlname}`,
//             // inject: 'body',
//             template: htmlFile,
//             minify: false
//         })
//     )
// });

const pugFiles = globule.find('src/templates/**/*.pug', {
    ignore: ['src/templates/components/*','src/templates/layouts/*' ]
});

pugFiles.forEach((pug) => {
    const html = pug.split('/').slice(-1)[0].replace('.pug', '.html');
    build.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${path.resolve(__dirname, 'dist')}/${html}`,
        // inject:'body',
        template: pug,
        minify: false
      })
    )
});

module.exports = build;
