const path = require('path')

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
                        loader: 'style-loader'
                     },
                     {
                         loader: 'css-loader'
                     }
                 ]
            }
        ]
    }
}
